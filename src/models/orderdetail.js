module.exports = (sequelize, DataTypes) => {
  const Orderdetail = sequelize.define(
    "Orderdetail",
    {
      dishTag: { type: DataTypes.STRING, allowNull: false },
      qty: { type: DataTypes.BIGINT, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false }
    },
    {
      underscored: true
    }
  );

  return Orderdetail;
};
