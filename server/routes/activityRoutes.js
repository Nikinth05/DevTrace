const express = require("express");
const {
  trackActivity,
  getActivityByUsername,
} = require("../controllers/activityController");

const router = express.Router();

router.post("/track", trackActivity);
router.get("/:username", getActivityByUsername);

module.exports = router;
