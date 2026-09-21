const createResourceRouter = require('./resource.routes');

module.exports = createResourceRouter({
  fields: ['name', 'muscleGroup'],
  label: 'Ejercicio',
});
