const models = require("../models");

module.exports = function(app) {
  app.post("/placeOrder", async (req, res) => {
    console.log("req in placeOrder===>", req);
    let record = {};
    try {
      let reqObj = {
        dishTag: req.body.dishTag,
        qty: req.body.qty,
        status: false
      };
      record = await models.Orderdetail.create(reqObj);
    } catch (e) {
      console.log("Order not done");
      res.send({
        message: "Order can not be placed. Try again.",
        success: false
      });
    }
    if (record && Object.keys(record).length) {
      console.log("Order is placed", record);
      res.send({ message: "Order Placed Successfully.", success: true });
    }
  });
};
