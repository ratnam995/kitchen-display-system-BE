module.exports = (sequelize, DataTypes) => {
    const Prediction = sequelize.define(
      'Prediction',
      {
        dishTag : { type: DataTypes.STRING, allowNull: false, unique: true },
        predictedQty : { type: DataTypes.STRING, allowNull: false }
      },
      {
        underscored: true,
      }
    );
  
    return Prediction;
  };
  