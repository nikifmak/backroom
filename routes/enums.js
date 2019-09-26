const express = require("express");
const router = express.Router();

const { styles, categories } = require("../config/enums.json");

// @route   GET api/v1/enums/styles
// @desc     post route
// @access  Public
router.get("/styles", (req, res) => res.json(styles));

// @route   GET api/v1/enums/categories
// @desc    Tests post route
// @access  Public
router.get("/categories", (req, res) => res.json(categories));

module.exports = router;
