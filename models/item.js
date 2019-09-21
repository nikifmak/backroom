"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      category: DataTypes.STRING,
      styles: DataTypes.STRING,
      height: DataTypes.FLOAT,
      length: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      width: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      imageUrl: DataTypes.STRING,
      supplierId: DataTypes.INTEGER
    },
    {}
  );
  Item.associate = function(models) {
    Item.belongsTo(modes.Supplier, {
      foreignKey: "supplierId",
      as: "supplier"
    });
  };
  return Item;
};
