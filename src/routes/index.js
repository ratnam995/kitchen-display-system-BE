const orderRoutes = require('./orders');
const predictionRoutes = require('./predictions');
const reportRoutes = require('./downloadReport');

module.exports = function(app, io) {
    orderRoutes(app, io);
    predictionRoutes(app, io);
    reportRoutes(app, io);
    // Other route groups could go here, in the future
  };