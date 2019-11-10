const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// @route   GET api/v1/item/test
// @desc    Tests post route
// @access  Public
router.get("/test", async (req, res) =>
  res.json({ msg: await Item.getNextItemCode() })
);

// LIMIT {itemsPerPage} OFFSET {(page - 1) * itemsPerPage}

// @route   GET api/v1/items/
// @desc    Get items
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    let query = {
      limit: pageSize || 10
    };

    if (page && pageSize) {
      query.offset = (page - 1) * pageSize;
    }

    console.log(query);

    const items = await Item.findAndCountAll(query);
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

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

    console.log("code", code);

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

// @route   PUT api/v1/items/
// @desc    Update a supplier
// @access  Public
router.put("/:code", async (req, res) => {
  try {
    const item = await Item.findWithSupplier(req.params.code);

    if (!item) {
      return res.status(404).send({
        message: "Not Found"
      });
    }

    const newItem = await item.update({ ...req.body });
    res.json(newItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/v1/items/
// @desc    GET a item
// @access  Public
router.get("/:code", async (req, res) => {
  try {
    const item = await Item.findWithSupplier(req.params.code);

    if (!item) {
      return res.status(404).send({
        message: "Not Found"
      });
    }

    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
