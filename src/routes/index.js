const orderRoutes = require('./orders');
const predictionRoutes = require('./predictions');

module.exports = function(app) {
    orderRoutes(app);
    predictionRoutes(app);
    // Other route groups could go here, in the future
  };