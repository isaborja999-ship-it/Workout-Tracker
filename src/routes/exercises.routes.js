const createResourceRouter = require('./resource.routes');
const exercisesConfig = require('./exercises.config');

module.exports = createResourceRouter(exercisesConfig);
