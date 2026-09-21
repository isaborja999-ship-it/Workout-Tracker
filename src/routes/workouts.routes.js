const createResourceRouter = require('./resource.routes');

module.exports = createResourceRouter({
  fields: ['name', 'description'],
  label: 'Rutina',
});
