module.exports = (sequelize, DataTypes) => {
  const Orderdetail = sequelize.define(
    "Orderdetail",
    {
      dishtag: { type: DataTypes.STRING, allowNull: false },
      qty: { type: DataTypes.BIGINT, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false }
    },
    {
      underscored: true
    }
  );

  Orderdetail.associate = function(models) {
    Orderdetail.belongsTo(models.Dish, { foreignKey: "dish_id", targetKey: 'id' });
  };

  return Orderdetail;
};
