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
    }    
  };

  const config = {
    tableName: 'product_categories',
    //Si el nombre de la tabla no coincide con el del modelo
    timestamps: false, //Si no tengo timestamps
  };

  const Product_category = sequelize.define("Product_category", cols, config);
  Product_category.associate = (models) => {
    Product_category.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'product_category_id'
    })
  };
  return Product_category;

};