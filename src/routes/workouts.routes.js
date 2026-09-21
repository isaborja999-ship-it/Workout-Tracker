const createResourceRouter = require('./resource.routes');
const workoutsConfig = require('./workouts.config');

module.exports = createResourceRouter(workoutsConfig);
