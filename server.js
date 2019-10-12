require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { sequelize } = require("./models");

const suppliers = require("./routes/suppliersRoute");
const enums = require("./routes/enumsRoute");
const items = require("./routes/itemsRoute");
const upload = require("./routes/uploadRoute");

sequelize
  .authenticate()
  .then(() => {
    console.log("[OK] Postgresql");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ status: 200 }));

/* Routes */
app.use("/api/v1/suppliers", suppliers);
app.use("/api/v1/enums", enums);
app.use("/api/v1/items", items);
app.use("/api/v1/upload", upload);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
