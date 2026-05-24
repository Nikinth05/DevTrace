const express = require("express");
const {
  getUserProfile,
  getUserRepos,
  getUserCommits,
  getUserLanguages,
} = require("../controllers/githubController");

const router = express.Router();

router.get("/user/:username", getUserProfile);
router.get("/repos/:username", getUserRepos);
router.get("/commits/:username", getUserCommits);
router.get("/languages/:username", getUserLanguages);

module.exports = router;
