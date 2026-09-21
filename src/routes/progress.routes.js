const createResourceRouter = require('./resource.routes');

module.exports = createResourceRouter({
  fields: ['userId', 'workoutId', 'completedAt'],
  label: 'Registro de progreso',
});
