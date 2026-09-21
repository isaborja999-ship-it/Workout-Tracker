import express from 'express';

function createResourceRouter({ fields, label }) {
  const router = express.Router();
  const records = [];
  let nextId = 1;

  function validate(body) {
    return fields.filter((field) => !body[field] || String(body[field]).trim() === '');
  }

  router.get('/', (req, res) => res.status(200).json({ data: records, total: records.length }));

  router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID inválido' });
    const record = records.find((item) => item.id === id);
    if (!record) return res.status(404).json({ error: `${label} no encontrado` });
    return res.status(200).json({ data: record });
  });

  router.post('/', (req, res) => {
    const missing = validate(req.body);
    if (missing.length) return res.status(400).json({ error: 'Datos requeridos faltantes', fields: missing });
    const record = { id: nextId++ };
    fields.forEach((field) => { record[field] = String(req.body[field]).trim(); });
    records.push(record);
    return res.status(201).json({ message: `${label} creado`, data: record });
  });

  router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID inválido' });
    const missing = validate(req.body);
    if (missing.length) return res.status(400).json({ error: 'PUT requiere el recurso completo', fields: missing });
    const record = records.find((item) => item.id === id);
    if (!record) return res.status(404).json({ error: `${label} no encontrado` });
    fields.forEach((field) => { record[field] = String(req.body[field]).trim(); });
    return res.status(200).json({ message: `${label} actualizado`, data: record });
  });

  router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID inválido' });
    const record = records.find((item) => item.id === id);
    if (!record) return res.status(404).json({ error: `${label} no encontrado` });
    const updates = Object.keys(req.body).filter((field) => fields.includes(field));
    if (!updates.length) return res.status(400).json({ error: 'No hay campos actualizables' });
    updates.forEach((field) => { record[field] = String(req.body[field]).trim(); });
    return res.status(200).json({ message: `${label} actualizado parcialmente`, data: record });
  });

  router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID inválido' });
    const index = records.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: `${label} no encontrado` });
    records.splice(index, 1);
    return res.status(204).send();
  });

  return router;
}

export default createResourceRouter;
