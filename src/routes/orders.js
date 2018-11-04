const models = require("../models");
const { dishPredictionFuncs } = require('../common/dishPrediction');

module.exports = function(app, io) {
  app.post("/placeOrder", async (req, res) => {
    console.log("req in placeOrder===>", req);
    let record = {};
    try {
      let reqObj = {
        dishtag: req.body.dishTag,
        dish_id: req.body.dishId,
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
      let fetchedDishDetail = await dishPredictionFuncs.fetchDataFromDishAndPredictionModel(
        record.dataValues.dishtag
      );
      let socketResponse = Object.assign(
        {},
        record.dataValues,
        fetchedDishDetail
      );
      console.log("socketResponse", socketResponse);
      io.emit("OrderPlaced", socketResponse);
      res.send({ message: "Order Placed Successfully.", success: true });
    }
  });

  app.get("/fetchOrders", async (req, res) => {
    let predictionModel = models.Prediction;
    let orderList = JSON.parse(
      JSON.stringify(await models.Orderdetail.findAll({}))
    );
    let response = [];
    // console.log("orderList", orderList);
    if (orderList.length) {
      try {
        let promiseArr = await Promise.all(
          orderList.map(async singleOrder => {
            // console.log("fetchedDish 2");
            let fetchedDishDetail = await dishPredictionFuncs.fetchDataFromDishAndPredictionModel(
              singleOrder.dishtag
            );
            // console.log("fetchedDish 3", fetchedDishDetail);
            response.push(Object.assign({}, singleOrder, fetchedDishDetail));
            // }
          })
        );
        // console.log("response", response);
        res.send(response);
      } catch (e) {
        // console.log("error", e);
        res.send({ message: "Unable to fetch order detail", success: false });
      }
    } else {
      // console.log("no orders yet");
      response = [];
      res.send([]);
    }
  });

  app.post("/completeOrder", async (req, res) => {
    console.log("req", req);
    let reqObj = {};
    let dishTag = req.body.dishtag;
    let qty = parseInt(req.body.qty);
    let orderId = req.body.id;
    try {
      let dishData = JSON.parse(
        JSON.stringify(
          await models.Dish.findOne({ where: { dishtag: dishTag } })
        )
      );
      let ctn = parseInt(dishData.createdtillnow) + qty;
      console.log("dishData", dishData, qty, ctn);
      let upCount = await models.sequelize.query(
        `UPDATE "Dishes" SET createdtillnow= :ctn WHERE id = :dishID`,
        {
          replacements: {
            ctn: ctn,
            status: "true",
            dishID: dishData.id
          },
          type: models.sequelize.QueryTypes.UPDATE
        }
      );
      console.log("upCount 1", JSON.parse(JSON.stringify(upCount)));
      if (upCount && upCount.length && upCount[1]) {
        console.log("upCount 1");
        upCount = await models.sequelize.query(
          `UPDATE "Orderdetails" SET status= :status WHERE id = :orderID`,
          {
            replacements: {
              status: true,
              orderID: orderId
            },
            type: models.sequelize.QueryTypes.UPDATE
          }
        );
        console.log("upCount", JSON.parse(JSON.stringify(upCount)));
        if (upCount && upCount.length && upCount[1]) {
          // let newRec = JSON.parse(JSON.stringify(req.body));
          // newRec.createdtillnow = ctn;
          // newRec.status = true;
          let orderDetail = await models.sequelize.query(
            `SELECT * FROM "Orderdetails" WHERE id = :orderID`,
            {
              replacements: {
                orderID: orderId
              },
              type: models.sequelize.QueryTypes.SELECT
            }
          );

          let fetchedData = await dishPredictionFuncs.fetchDataFromDishAndPredictionModel(dishTag);
          let newRec = Object.assign({}, orderDetail[0], fetchedData);
          console.log("newRec", JSON.parse(JSON.stringify(newRec)));
          io.emit("OrderCompleted", newRec);
          res.send({
            message: "OrderCompleted.",
            success: true,
            updatedRecord: newRec
          });
        } else {
          res.send({
            message: "Unable to update record. Please try again",
            success: false
          });
        }
      } else {
        res.send({
          message: "Unable to update record. Please try again",
          success: false
        });
      }
    } catch (e) {
      res.send({
        message: "Unable to update record. Please try again",
        success: false
      });
    }
  });
};


