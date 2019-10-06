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
    { tableName: "items" }
  );

  Item.associate = (models) => {
    Item.belongsTo(models.Supplier, {
      foreignKey: "supplierId",
      targetKey: "id"
    });
  };

  Item.getNextItemCode = async () => {
    let result = await Item.findAll({
      attributes: [[sequelize.fn("MAX", sequelize.col("code")), "maxCode"]]
    });

    let code = "";

    if (!result) {
      return null;
    }

    if (!result.maxCode) {
      code = "item_00001";
    } else {
      let previousCode = result.maxCode.replace("item_", "");

      console.log(previousCode);
    }

    console.log(code);
    return code;
  };

  return Item;
};
