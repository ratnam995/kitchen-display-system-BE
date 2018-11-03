const models = require("../models");

module.exports = function(app) {
  app.post("/setPrediction", async (req, res) => {
    console.log("req in setPrediction===>", req);
    let record = {};
    try {
      let reqObj = {
        dishTag: req.body.dishTag,
        predictedQty: req.body.qty
      };
      record = await models.Prediction.create(reqObj);
    } catch (e) {
      console.log("Prediction not done");
      res.send({
        message: "Prediction could not be saved. Try again.",
        success: false
      });
    }
    if (record && Object.keys(record).length) {
      console.log("Prediction is done");
      res.send({ message: "Prediction saved successfully.", success: true });
    }
  });
};
