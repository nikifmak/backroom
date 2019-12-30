require("dotenv").config();

module.exports = {
  username: process.env.RDS_USERNAME,
  database: process.env.RDS_DATABASE,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  dialect: "postgres"
};
