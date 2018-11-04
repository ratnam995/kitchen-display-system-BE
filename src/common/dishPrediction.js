const models = require("../models");

exports.dishPredictionFuncs = {
  fetchDataFromDishAndPredictionModel(dishTag) {
    // let dishTag = record.dataValues.dishtag;
    return new Promise(async (resolve, reject) => {
      // console.log("HERRRRREEE");
      let predictionModel = models.Prediction;
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
      if (fetchedDish.length) {
        fetchedDish = JSON.parse(JSON.stringify(fetchedDish[0]));
        let predictedqtyObj = fetchedDish.Prediction;
        delete fetchedDish.Prediction;
        // console.log("fetchedDish", fetchedDish);
        return resolve(Object.assign({}, fetchedDish, predictedqtyObj));
      } else return resolve({});
    });
  },
  fetchAllDataFromDishAndPredictionModel() {
    // let dishTag = record.dataValues.dishtag;
    return new Promise(async (resolve, reject) => {
      // console.log("HERRRRREEE");
      let predictionModel = models.Prediction;
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
      console.log("fetchedDish", JSON.parse(JSON.stringify(fetchedDish)));
      let fetchedDataArr = [];
      if (fetchedDish.length) {
        fetchedDish = JSON.parse(JSON.stringify(fetchedDish));
        fetchedDish.map(singleDish => {
          let predictedqtyObj = singleDish.Prediction;
          delete singleDish.Prediction;
          fetchedDataArr.push(Object.assign({}, singleDish, predictedqtyObj));
        });
        console.log(
          "fetchedDataArr",
          JSON.parse(JSON.stringify(fetchedDataArr))
        );
        return resolve(fetchedDataArr);
      } else return resolve([]);
    });
  }
};
