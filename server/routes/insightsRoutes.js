const express = require("express");
const { getInsightsByUsername } = require("../controllers/insightsController");

const router = express.Router();

router.get("/:username", getInsightsByUsername);

module.exports = router;
