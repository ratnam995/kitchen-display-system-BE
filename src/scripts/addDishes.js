const models = require("../models");

async function saveDataToDB() {
  let dishes = [
    {
      dishtag: "ngv-chwr-ch",
      dishname: "Chicken Wrap",
      cuisine: "Chinese",
      createdtillnow: 0
    },
    {
      dishtag: "ngv-chla-co",
      dishname: "Chicken Lasagne",
      cuisine: "Continental",
      createdtillnow: 0
    },
    {
      dishtag: "vg-pawr-ch",
      dishname: "Paneer Wrap",
      cuisine: "Chinese",
      createdtillnow: 0
    },
    {
      dishtag: "vg-albu-ch",
      dishname: "Roasted Potato Tikka Burger",
      cuisine: "Chinese",
      createdtillnow: 0
    },
    {
      dishtag: "ngv-chbir-mu",
      dishname: "Chicken Biryani",
      cuisine: "Mughlai",
      createdtillnow: 0
    }
  ];
  await fillDishesTable(dishes);
}

const fillDishesTable = dishes =>
  new Promise(async (resolve, reject) => {
    try {
      const promisesArr = await Promise.all(
        dishes.map(async ({ dishtag, dishname, cuisine, createdtillnow }) => {
          const record = await models.Dish.create({
            dishtag,
            dishname,
            cuisine,
            createdtillnow
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
