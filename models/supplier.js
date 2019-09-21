"use strict";
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING
    },
    {}
  );
  Supplier.associate = function(models) {
    Supplier.hasMany(models.Item, { as: "items" });
  };
  return Supplier;
};
