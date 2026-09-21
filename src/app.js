const express = require('express');
const usersRouter = require('./routes/users.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set('X-Powered-By', 'Workout Tracker API');
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});

app.get('/', (req, res) => {
  res.send('Workout Tracker API en funcionamiento');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'workout-tracker-api' });
});

app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
