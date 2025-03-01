"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn("events", "updatedAt", "TIMESTAMP");
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn("events", "updatedAt");
  }
};
