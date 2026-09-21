const createResourceRouter = require('./resource.routes');
const progressConfig = require('./progress.config');

module.exports = createResourceRouter(progressConfig);
