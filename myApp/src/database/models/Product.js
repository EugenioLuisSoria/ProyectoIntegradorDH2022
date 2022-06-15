const sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const cols = {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: false,
    },   
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      // allowNull: false,
    },
    weight: {
      type: DataTypes.TINYINT.UNSIGNED,
      // allowNull: true,
      defaultValue: null,
    },
    color: {
      type: DataTypes.STRING,
      // allowNull: true,
      defaultValue: null,
    },
    size: {
      type: DataTypes.STRING,
      // allowNull: true,
      defaultValue: null,
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      // allowNull: false,
    },
    discount: {
      type: DataTypes.TINYINT.UNSIGNED,
      // allowNull: true,
      defaultValue: 0,
    },
    picture: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    product_category_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        // allowNull: true,
        defaultValue: null,
    },    
  };

  const config = {
    tableName: 'products',
    //Si el nombre de la tabla no coincide con el del modelo
    timestamps: false, //Si no tengo timestamps
  };

  const Product = sequelize.define("Product", cols, config);
  Product.associate = (models) => {
    Product.belongsTo(models.Product_category, {
      as: 'product_category',
      foreignKey: 'product_category_id'
    }),
    
    Product.hasMany(models.Item,{
      as: "items",      
      foreignKey: "product_id"
    })
  };
  return Product;

};