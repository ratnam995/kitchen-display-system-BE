const sequelize = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
// const data = require("./public/fetchedData");
const models = require("./src/models");
// console.log(data, ".....data.......", sequelize);

const port = 3030;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));


// app.post("/api/getDataSet", async (req, res) => {
//   try {
//     console.log("startDate", req);
//     let startDate = req.body.startDate;
//     let endDate = req.body.endDate;
//     let fetchedData = await fillAggregates(startDate, endDate);
//     res.send(fetchedData);
//   } catch (error) {
//     console.log(error, "!!!!!!FetchDataFails!!!!!!");
//     res.send("Error while fetching data");
//   }
// });

app.listen(port, () => {
  console.log("We are live on " + port);
  require("./src/routes")(app);
});
