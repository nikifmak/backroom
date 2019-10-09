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
      foreignKey: "supplierId"
    });
  };

  const padding = "00000";
  const paddingLength = padding.length;

  function addPadding(num) {
    return (padding + num).substr(paddingLength * -1, paddingLength);
  }

  Item.getNextItemCode = async () => {
    let result = await Item.findOne({
      raw: true,
      attributes: [[sequelize.fn("MAX", sequelize.col("code")), "maxCode"]]
    });

    let code = "";

    if (!result) {
      return null;
    }

    if (!result.maxCode) {
      console.log("asd");
      code = "item_00001";
    } else {
      let previousCode = parseInt(result.maxCode.replace("item_", ""));
      previousCode++;

      code = "item_" + addPadding(previousCode);
    }

    console.log(code);
    return code;
  };

  return Item;
};
