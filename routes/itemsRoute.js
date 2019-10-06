const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// @route   GET api/v1/item/test
// @desc    Tests post route
// @access  Public
router.get("/test", async (req, res) =>
  res.json({ msg: await Item.getNextItemCode() })
);

// @route   POST api/v1/items/
// @desc    Create or update a supplier
// @access  Public
router.post("/", async (req, res) => {
  try {
    const {
      name,
      url,
      category,
      styles,
      height,
      length,
      weight,
      width,
      price,
      imageUrl,
      supplierId
    } = req.body;

    const code = await Item.getNextItemCode();

    const item = await Item.create({
      name,
      code,
      url,
      category,
      styles,
      height,
      length,
      weight,
      width,
      price,
      imageUrl,
      supplierId
    });
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
