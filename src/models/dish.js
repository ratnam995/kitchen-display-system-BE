module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define(
    "Dish",
    {
      dishtag: { type: DataTypes.STRING, allowNull: false },
      dishname: { type: DataTypes.STRING, allowNull: false },
      cuisine: { type: DataTypes.STRING, allowNull: false },
      createdtillnow: { type: DataTypes.BIGINT, allowNull: false }
    },
    {
      underscored: true
    }
  );

  Dish.associate = function(models) {
    Dish.hasOne(models.Prediction, { foreignKey: "dish_id", sourceKey: "id" });
    Dish.hasMany(models.Orderdetail, {
      foreignKey: "dish_id",
      sourceKey: "id"
    });
  };

  // Dish.associate = function(models) {

  // };

  return Dish;
};
