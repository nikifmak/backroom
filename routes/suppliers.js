const express = require("express");
const router = express.Router();
const { Supplier } = require("../models");

// @route   GET api/v1/suppliers/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Suppliers Works" }));

// @route   POST api/v1/suppliers/
// @desc    Create or update a supplier
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, url } = req.body;

    const supplier = await Supplier.create({ name, url });
    res.json(supplier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GEt api/v1/suppliers/
// @desc    Get all suppliers
// @access  Public
router.get("", async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({});
    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
