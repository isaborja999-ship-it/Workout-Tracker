const express = require('express');

const router = express.Router();

// Datos temporales: se reemplazarán por MySQL al configurar la persistencia.
const users = [];
const requiredFields = ['name', 'email'];

function missingRequiredFields(data) {
  return requiredFields.filter((field) => !data[field] || String(data[field]).trim() === '');
}

router.get('/', (req, res) => {
  const { limit, search } = req.query;
  let result = users;

  if (search) {
    result = result.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (limit !== undefined) {
    const parsedLimit = Number(limit);
    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      return res.status(400).json({ error: 'limit debe ser un entero positivo' });
    }
    result = result.slice(0, parsedLimit);
  }
  return res.status(200).json({ data: result, total: result.length });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID inválido' });

  const user = users.find((item) => item.id === id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  return res.status(200).json({ data: user });
});

router.post('/', (req, res) => {
  const missing = missingRequiredFields(req.body);
  if (missing.length) return res.status(400).json({ error: 'Datos requeridos faltantes', fields: missing });

  const user = { id: users.length + 1, name: req.body.name.trim(), email: req.body.email.trim() };
  users.push(user);
  return res.status(201).json({ message: 'Usuario creado', data: user });
});

module.exports = router;
