const models = require("../models");

async function saveDataToDB() {
  let dishes = [
    {
      dishTag: "ngv-chwr-ch",
      dishName: "Chicken Wrap",
      cuisine: "Chinese",
      createdTillNow: 0
    },
    {
      dishTag: "ngv-chla-co",
      dishName: "Chicken Lasagne",
      cuisine: "Continental",
      createdTillNow: 0
    },
    {
      dishTag: "vg-pawr-ch",
      dishName: "Paneer Wrap",
      cuisine: "Chinese",
      createdTillNow: 0
    },
    {
      dishTag: "vg-albu-ch",
      dishName: "Roasted Potato Tikka Burger",
      cuisine: "Chinese",
      createdTillNow: 0
    },
    {
      dishTag: "ngv-chbir-mu",
      dishName: "Chicken Biryani",
      cuisine: "Mughlai",
      createdTillNow: 0
    }
  ];
  await fillDishesTable(dishes);
}

const fillDishesTable = dishes =>
  new Promise(async (resolve, reject) => {
    try {
        console.log("check", dishes);
      const promisesArr = await Promise.all(
        dishes.map(async ({ dishTag, dishName, cuisine, createdTillNow }) => {
          const record = await models.Dish.create({
            dishTag,
            dishName,
            cuisine,
            createdTillNow
          });

          return true;
        })
      );
      resolve(true);
    } catch (error) {
      console.log(error, "!!!!!!!!!!!!!");
      resolve(false);
    }
  });

  async function save() {
    console.log(
      "Started Saving data-------------------------------------------------------------- : "
    );
    try {
      await saveDataToDB();
    } catch (e) {
      console.error(
        e,
        "!!!!!!!!!!!!!!!!!!!error in saving save()!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
    }
  
    console.log(
      "Finished saving to db >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
  
    process.exit(0);
  }
  
  save();
  
  process.on("unhandledRejection", err => {
    console.log("Unhandled rejection", err);
  });
  
  process.on("uncaughtException", err => {
    console.log("Uncaught exception", err);
  });
