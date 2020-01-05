"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      origin: DataTypes.STRING,
      data: DataTypes.JSONB,
      type: DataTypes.STRING
    },
    { tableName: "events" }
  );

  return Event;
};
