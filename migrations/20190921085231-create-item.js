"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("items", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false
        },
        height: {
          type: Sequelize.FLOAT
        },
        length: {
          type: Sequelize.FLOAT
        },
        weight: {
          type: Sequelize.FLOAT
        },
        width: {
          type: Sequelize.FLOAT
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        styles: {
          type: Sequelize.JSONB
        },
        imageUrl: {
          type: Sequelize.STRING
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false
        },
        supplierId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "suppliers",
            key: "id"
          }
        },
        color: {
          type: Sequelize.STRING
        },
        materials: {
          type: Sequelize.STRING
        },
        collection: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() =>
        queryInterface.addIndex("items", ["name", "category", "styles"])
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("items");
  }
};
