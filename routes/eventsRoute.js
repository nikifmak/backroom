const express = require("express");
const router = express.Router();
const { Event } = require("../models");

// @route   GET api/v1/event/test
// @desc    Tests get route
// @access  Public
router.get("/test", async (req, res) => res.json({ msg: "hello from test" }));

module.exports = router;
