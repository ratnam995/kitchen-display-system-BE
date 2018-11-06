const pdf = require("html-pdf");
var path = require("path");
const { dishPredictionFuncs } = require("../common/dishPrediction");
const srcDir = __dirname;
const rootDir = srcDir.substring(0, srcDir.lastIndexOf("src") - 1);
var options = {
  format:
    "Letter" /*, phantomPath: '../../../node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'*/
};

module.exports = function(app, io) {
  app.post("/downloadpdf", async (req, res) => {
    let htmlString = "";
    let fetchedData = await dishPredictionFuncs.fetchAllDataFromDishAndPredictionModel();
    console.log("fetched data in download pdf", fetchedData);
    console.log("fetched data in download pdf", fetchedData.length);
    if (fetchedData.length > 0) {
      let headerList = [
        { header: "Dish Name", mapTo: "dishname" },
        { header: "Produced", mapTo: "createdtillnow" },
        { header: "Predicted", mapTo: "predictedqty" }
      ];
      let tableColumnHTML = "";
      headerList.map(singleHeader => {
        tableColumnHTML =
          tableColumnHTML +
          "<td style='font-weight: 700'>" +
          singleHeader.header +
          "</td>";
      });
      tableColumnHTML = tableColumnHTML + "</thead>";
      let tableBodyHTML = "<tbody>";
      fetchedData.map(singleFetchedData => {
        if (!singleFetchedData.hasOwnProperty("predictedqty"))
          singleFetchedData["predictedqty"] = 0;
        tableBodyHTML = tableBodyHTML + "<tr>";
        headerList.map(singleHeader => {
          tableBodyHTML =
            tableBodyHTML +
            "<td><span>" +
            singleFetchedData[singleHeader.mapTo] +
            "</span></td>";
        });
        tableBodyHTML = tableBodyHTML + "</tr>";
      });
      htmlString =
        "<html><body style='font-size: 1.0em;'backgournd:blue;><div class='card' style='height: 70%; margin:10px'><div class='card-header'><h5>Dish</h5></div><div class='card-body' style='height:100%; padding:2px'><table class='table table-striped'><thead class='thead-inverse'>" +
        tableColumnHTML +
        "" +
        tableBodyHTML +
        "</body></html>";
    } else {
      htmlString =
        "<html><body style='font-size: 1.0em;'backgournd:blue;>No records found to generate report</body></html>";
    }

    console.log("HTML STRING", htmlString);
    let timeStamp = new Date().toISOString();
    timeStamp = timeStamp
      .replace(/:\s*/g, "")
      .replace(/\./g, "")
      .replace(/-\s*/g, "");
    console.log("sendEmail: timeStamp -->", timeStamp, rootDir);
    try {
      pdf
        .create(htmlString, options)
        .toFile(
          rootDir + "/kitchen-reports/kitchen_" + timeStamp + ".pdf",
          (err, resp) => {
            console.log(
              "sendEmail: PDF is generated ...  err, resp -->",
              err,
              resp
            );
            let file = path.join(
              rootDir + "/kitchen-reports/kitchen_" + timeStamp + ".pdf"
            );
            console.log("file path", file);
            res.contentType("application/pdf");
            res.download(file, function(err) {
              if (err) {
                console.log("Error");
                console.log(err);
              } else {
                console.log("Success");
              }
            });
          }
        );
    } catch (e) {
      res.send({ message: "Error", success: false });
    }
  });
};
