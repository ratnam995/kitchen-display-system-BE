const models = require("../models");

exports.dishPredictionFuncs = {
  fetchDataFromDishAndPredictionModel(dishTag) {
    //Fetches only the matched dish with there prdictions.
    return new Promise(async (resolve, reject) => {
      let predictionModel = models.Prediction;
      try {
        let fetchedDish = await models.Dish.findAll({
          where: { dishtag: dishTag },
          attributes: ["dishtag", "dishname", "createdtillnow"],
          include: [
            {
              model: predictionModel,
              attributes: ["predictedqty"],
              required: false
            }
          ]
        });
        // console.log("fetchedDish", JSON.parse(JSON.stringify(fetchedDish)));
        if (fetchedDish.length) {
          fetchedDish = JSON.parse(JSON.stringify(fetchedDish[0]));
          let predictedqtyObj = fetchedDish.Prediction;
          delete fetchedDish.Prediction;
          return resolve(Object.assign({}, fetchedDish, predictedqtyObj));
        } else return resolve({});
      } catch (e) {
        return reject({
          message: "Error while fetching data.",
          success: false
        });
      }
    });
  },
  fetchAllDataFromDishAndPredictionModel() {
    //Fetches complete dish list with there prdictions.
    return new Promise(async (resolve, reject) => {
      let predictionModel = models.Prediction;
      try {
        let fetchedDish = await models.Dish.findAll({
          attributes: ["dishtag", "dishname", "createdtillnow"],
          include: [
            {
              model: predictionModel,
              attributes: ["predictedqty", "dishtag"],
              required: false
            }
          ]
        });
        // console.log("fetchedDish", JSON.parse(JSON.stringify(fetchedDish)));
        let fetchedDataArr = [];
        if (fetchedDish.length) {
          fetchedDish = JSON.parse(JSON.stringify(fetchedDish));
          fetchedDish.map(singleDish => {
            let predictedqtyObj = singleDish.Prediction;
            delete singleDish.Prediction;
            fetchedDataArr.push(Object.assign({}, singleDish, predictedqtyObj));
          });
          // console.log(
          //   "fetchedDataArr",
          //   JSON.parse(JSON.stringify(fetchedDataArr))
          // );
          return resolve(fetchedDataArr);
        } else return resolve([]);
      } catch (e) {
        return reject({
          message: "Error while fetching data.",
          success: false
        });
      }
    });
  }
};
