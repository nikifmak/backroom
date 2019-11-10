"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      category: DataTypes.STRING,
      styles: DataTypes.JSONB,
      height: DataTypes.FLOAT,
      length: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      width: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      imageUrl: DataTypes.STRING,
      supplierId: DataTypes.INTEGER,
      url: DataTypes.STRING,
      color: DataTypes.STRING,
      materials: DataTypes.STRING,
      collection: DataTypes.STRING
    },
    { tableName: "items" }
  );

  Item.associate = (models) => {
    Item.belongsTo(models.Supplier, {
      foreignKey: "supplierId"
    });
  };

  const padding = "0000000";
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
      code = padding;
    } else {
      let previousCode = parseInt(result.maxCode);
      previousCode++;

      code = addPadding(previousCode);
    }

    return code;
  };

  Item.findWithSupplier = (code) => {
    return Item.findOne({
      where: {
        code
      },
      include: [
        {
          model: sequelize.models.Supplier,
          attributes: ["id", "name", "url"]
        }
      ]
    });
  };

  return Item;
};
