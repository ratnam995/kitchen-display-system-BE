const sequelize = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
// const data = require("./public/fetchedData");
const models = require("./src/models");
// console.log(data, ".....data.......", sequelize);
const http = require("http");
const socket = require("socket.io");

const server = http.Server(app);
const io = socket(server);
const port = 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// socket.io connection
io.on("connection", socket => {
  console.log("Connected to Socket!!" + socket.id);
  // // Receiving Todos from client
  // socket.on("placeOrder", order => {
  //   console.log("socketData: " + JSON.stringify(Todo));
  //   orderController.addTodo(io);
  // });
});

// allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./src/routes")(app, io);

server.listen(port, () => {
  console.log("We are live on " + port);
});
