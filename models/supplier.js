"use strict";
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING
    },
    { tableName: "suppliers" }
  );

  Supplier.associate = function(models) {
    Supplier.hasMany(models.Item, {
      foreignKey: "supplierId"
    });
  };

  Supplier.findAllWithItemCount = () => {
    return Supplier.findAll({
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("supplierId")), "items_count"]
        ]
      },
      include: [
        {
          model: sequelize.models.Item,
          attributes: []
        }
      ],
      group: ["Supplier.id"]
    });
  };

  return Supplier;
};
