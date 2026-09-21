import assert from 'node:assert/strict';
import http from 'node:http';
import test from 'node:test';
import app from '../src/app.js';

function request(server, method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : undefined;
    const requestOptions = {
      method,
      port: server.address().port,
      path,
      headers: payload ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } : {},
    };
    const request = http.request(requestOptions, (response) => {
      let data = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, body: data ? JSON.parse(data) : null }));
    });
    request.on('error', reject);
    if (payload) request.write(payload);
    request.end();
  });
}

test('expone el estado de la API', async () => {
  const server = http.createServer(app).listen(0);
  try {
    const response = await request(server, 'GET', '/health');
    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
  } finally {
    server.close();
  }
});

test('permite crear, consultar y actualizar una rutina', async () => {
  const server = http.createServer(app).listen(0);
  try {
    const created = await request(server, 'POST', '/workouts', { name: 'Fuerza', description: 'Tren superior' });
    assert.equal(created.status, 201);
    assert.equal(created.body.data.name, 'Fuerza');

    const found = await request(server, 'GET', `/workouts/${created.body.data.id}`);
    assert.equal(found.status, 200);
    assert.equal(found.body.data.description, 'Tren superior');

    const updated = await request(server, 'PATCH', `/workouts/${created.body.data.id}`, { name: 'Fuerza A' });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.data.name, 'Fuerza A');
  } finally {
    server.close();
  }
});
