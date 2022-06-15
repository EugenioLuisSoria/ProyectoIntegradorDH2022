const sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const cols = {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      // allowNull: false,      
    },
    last_name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false, 
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        // allowNull: true,
        defaultValue: null,
    },
    user_category_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        // allowNull: false,
        
    }
};

  const config = {
    tableName: 'users',
    //Si el nombre de la tabla no coincide con el del modelo
    timestamps: false, //Si no tengo timestamps
  };

  const User = sequelize.define("User", cols, config);
  User.associate = (models) => {
    User.belongsTo(models.User_category, {
      as: 'user_category',
      foreignKey: 'user_category_id'
    }),
    User.belongsToMany(models.Item, {
      as:"items",
      through: "users_items",
      foreignKey: "user_id",
      otherKey: "item_id",
      timestamps: false
    })
  };
  return User;
};