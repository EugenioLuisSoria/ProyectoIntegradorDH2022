const sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const cols = {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: false,
    },     
    product_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        // allowNull: false,
    }    
  };

  const config = {
    tableName: 'items',
    //Si el nombre de la tabla no coincide con el del modelo
    timestamps: false, //Si no tengo timestamps
  };

  const Item = sequelize.define("Item", cols, config);
  Item.associate = (models) => {
    Item.belongsToMany(models.User, {
      as: "users",
      through: "users_items",
      foreignKey: "item_id",
      otherKey: "user_id", 
      timestamps: false
    }),
    Item.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id"
    })
    
  };
  return Item;

};