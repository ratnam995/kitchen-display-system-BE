module.exports = (sequelize, DataTypes) => {
    const Prediction = sequelize.define(
      'Prediction',
      {
        dishtag : { type: DataTypes.STRING, allowNull: false, unique: true },
        predictedqty : { type: DataTypes.STRING, allowNull: false }
      },
      {
        underscored: true,
      }
    );
      
    Prediction.associate = function(models) {
      Prediction.belongsTo(models.Dish, {foreignKey: 'dish_id', targetKey: 'id'});
    };

    return Prediction;
  };
  