const express = require("express");
const router = express.Router();
const { Item, sequelize } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    let query = {
      limit: 10,
      order: sequelize.random()
    };

    const items = await Item.findAll(query);
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.post("/item", async (req, res) => {
  try {
    const { category, id } = req.body;

    if (!category || !id) {
      return res.json({ success: false });
    }

    let query = `
    SELECT * FROM items 
    WHERE category = '${category}'
    AND NOT id = ${id}
    ORDER BY random()
    LIMIT 1`;

    let item = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });

    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
