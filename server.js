const express = require("express");
const bodyParser = require("body-parser");

const { sequelize } = require("./models");

sequelize
  .authenticate()
  .then(() => {
    console.log("[OK] Postgresql");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ status: 200 }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
