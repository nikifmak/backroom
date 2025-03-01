const express = require("express");
const router = express.Router();
const { Event } = require("../models");

// @route   GET api/v1/event/test
// @desc    Tests get route
// @access  Public
router.get("/test", async (req, res) => res.json({ msg: "hello from test" }));

// @route   POST api/v1/events/
// @desc    Create an event
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { type } = req.query;
    let data;

    if (!["view", "redirect"].includes(type)) {
      throw Error;
    }

    const {
      origin,
      itemId,
      deliverableID,
      version,
      itemUrl,
      supplier
    } = req.body;

    if (type === "view") {
      data = { itemId, deliverableID, version };
    }

    if (type === "redirect") {
      data = { itemId, deliverableID, version, itemUrl, supplier };
    }

    await Event.create({
      type,
      origin,
      data
    });

    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/v1/events/
// @desc    Get event
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    let query = {
      limit: pageSize || 100
    };

    if (page && pageSize) {
      query.offset = (page - 1) * pageSize;
    }

    const objects = await Event.findAndCountAll(query);
    res.json(objects);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
