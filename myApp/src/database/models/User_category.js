const sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const cols = {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: "customer",
    }    
  };

  const config = {
    tableName: 'user_categories',
    //Si el nombre de la tabla no coincide con el del modelo
    timestamps: false, //Si no tengo timestamps
  };

  const User_category = sequelize.define("User_category", cols, config);
  User_category.associate = (models) => {
    User_category.hasMany(models.User, {
      as: 'users',
      foreignKey: 'user_category_id'
    })
  };
  return User_category;

};