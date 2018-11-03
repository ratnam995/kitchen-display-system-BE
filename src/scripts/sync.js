const { get } = require("lodash");
const fixtures = require("sequelize-fixtures");
const models = require("../models");

console.log(process.env.NODE_ENV, "........sync.js.........");

async function syncDb() {
  console.log(
    "Rewriting tables------------------------------------------------------ :"
  );

  await models.Dish.sync({ force: true });
  await models.Prediction.sync({ force: true });
  await models.Orderdetail.sync({ force: true });

  console.log(
    "Finished Rewriting tables >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
}

async function fixSequences() {
  console.log(
    "Fixing sequences----------------------------------------------------- :"
  );

  const nextIncrement = result => {
    const count = parseInt(get(result, "[0].count", 0), 10);
    return count + 1;
  };

  const dishes = nextIncrement(
    await models.sequelize.query('SELECT COUNT(*) FROM "Dishes"', {
      type: models.sequelize.QueryTypes.SELECT
    })
  );
  const predictions = nextIncrement(
    await models.sequelize.query('SELECT COUNT(*) FROM "Predictions"', {
      type: models.sequelize.QueryTypes.SELECT
    })
  );
  const orderdetails = nextIncrement(
    await models.sequelize.query('SELECT COUNT(*) FROM "Orderdetails"', {
      type: models.sequelize.QueryTypes.SELECT,
    })
  );

  await models.sequelize.query(
    `ALTER SEQUENCE "Dishes_id_seq" RESTART WITH ${dishes};`
  );
  await models.sequelize.query(
    `ALTER SEQUENCE "Predictions_id_seq" RESTART WITH ${predictions};`
  );
  await models.sequelize.query(
    `ALTER SEQUENCE "Orderdetails_id_seq" RESTART WITH ${orderdetails};`
  );
  console.log(
    "Finished Fixing sequences >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
}

async function syncAndLoad() {
  console.log(
    "Started Syncing db-------------------------------------------------------------- : "
  );

  await syncDb();

  try {
    await fixSequences();
  } catch (e) {
    console.error(
      e,
      "!!!!!!!!!!!!!!!!!!!error in sync.js!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
  }

  console.log(
    "Finished Syncing db >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );

  process.exit(0);
}

syncAndLoad();

process.on("unhandledRejection", err => {
  console.log("Unhandled rejection", err);
});

process.on("uncaughtException", err => {
  console.log("Uncaught exception", err);
});
