const express = require("express");
const router = express.Router();
const { Supplier } = require("../models");
const authCheck = require("../middleware/authCheck");

// @route   GET api/v1/suppliers/test
// @desc    Tests post route
// @access  Public
router.get("/test", authCheck, (req, res) =>
  res.json({ msg: "Suppliers Works" })
);

// @route   POST api/v1/suppliers/
// @desc    Create a supplier
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, url } = req.body;

    const supplier = await Supplier.create({ name, url });
    res.json(supplier);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/v1/suppliers/
// @desc    GET a supplier
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).send({
        message: "Not Found"
      });
    }
    res.json(supplier);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/v1/suppliers/
// @desc    delete a supplier
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await Supplier.destroy({
      where: {
        id: id
      }
    });

    res.json({ success: rowsDeleted === 1 });
  } catch (err) {
    console.log(err);
    res.status(200).send({ success: false });
  }
});

// @route   PUT api/v1/suppliers/
// @desc    Update a supplier
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).send({
        message: "Not Found"
      });
    }

    const newSupplier = await supplier.update({ name, url });
    res.json(newSupplier);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   GEt api/v1/suppliers/
// @desc    Get all suppliers
// @access  Public
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.findAllWithItemCount();
    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
