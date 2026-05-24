const Activity = require("../models/Activity");
const { calculateInsights } = require("../utils/insightsCalculator");

/**
 * GET /api/insights/:username
 * Rule-based productivity insights from local activity data.
 */
const getInsightsByUsername = async (req, res, next) => {
  try {
    const username = req.params.username?.trim();

    if (!username) {
      const err = new Error("username is required");
      err.statusCode = 400;
      return next(err);
    }

    const normalizedUsername = username.toLowerCase();

    const activities = await Activity.find({
      username: normalizedUsername,
    })
      .sort({ date: -1 })
      .lean();

    const insights = calculateInsights(activities);

    res.json({
      success: true,
      data: {
        username: normalizedUsername,
        hasActivity: activities.length > 0,
        ...insights,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInsightsByUsername };
