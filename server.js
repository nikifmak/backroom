require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const passport = require("passport");
require("./services/passport");

const suppliers = require("./routes/suppliersRoute");
const enums = require("./routes/enumsRoute");
const items = require("./routes/itemsRoute");
const events = require("./routes/eventsRoute");
const upload = require("./routes/uploadRoute");
const auth = require("./routes/authRoute");
const rng = require("./routes/rngRoute");

const authMiddleware = require("./middleware/authCheck");

sequelize
  .authenticate()
  .then(() => {
    console.log("[OK] Postgresql");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();

app.use(
  cors({
    exposedHeaders: "x-auth-token"
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

/* Routes */
app.get("/", (req, res) => res.json({ status: 200, message: "hello" }));

app.use("/api/v1/suppliers", authMiddleware, suppliers);
app.use("/api/v1/enums", enums);
app.use("/api/v1/items", items);
app.use("/api/v1/events", events);
app.use("/api/v1/rng", rng);
app.use("/api/v1/upload", authMiddleware, upload);
app.use("/api/v1/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
