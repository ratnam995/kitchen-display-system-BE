module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define(
    "Dish",
    {
      dishTag: { type: DataTypes.STRING, allowNull: false },
      dishName: { type: DataTypes.STRING, allowNull: false },
      cuisine: { type: DataTypes.STRING, allowNull: false },
      createdTillNow: { type: DataTypes.BIGINT, allowNull: false }
    },
    {
      underscored: true
    }
  );

  return Dish;
};
