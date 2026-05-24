const Activity = require("../models/Activity");

const getTodayDate = () => new Date().toISOString().split("T")[0];

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

/**
 * POST /api/activity/track
 * Body: { username, codingTime, date? }
 * Increments coding time for the given user and day.
 */
const trackActivity = async (req, res, next) => {
  try {
    const { username, codingTime, date } = req.body;

    if (!username || codingTime == null) {
      const err = new Error("username and codingTime are required");
      err.statusCode = 400;
      return next(err);
    }

    const seconds = Number(codingTime);
    if (Number.isNaN(seconds) || seconds <= 0) {
      const err = new Error("codingTime must be a positive number (seconds)");
      err.statusCode = 400;
      return next(err);
    }

    const activityDate = date || getTodayDate();
    const normalizedUsername = username.trim().toLowerCase();

    const activity = await Activity.findOneAndUpdate(
      { username: normalizedUsername, date: activityDate },
      {
        $inc: { codingTime: seconds },
        $setOnInsert: { username: normalizedUsername, date: activityDate },
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Activity tracked",
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/activity/:username
 * Returns activity records plus totals for the dashboard.
 */
const getActivityByUsername = async (req, res, next) => {
  try {
    const normalizedUsername = req.params.username.trim().toLowerCase();

    const activities = await Activity.find({ username: normalizedUsername })
      .sort({ date: -1 })
      .lean();

    const totalSeconds = activities.reduce((sum, a) => sum + a.codingTime, 0);
    const totalCodingHours = Number((totalSeconds / 3600).toFixed(2));

    const byDate = Object.fromEntries(
      activities.map((a) => [a.date, a.codingTime])
    );

    const weeklyActivity = getLast7Days().map((date) => ({
      date,
      seconds: byDate[date] || 0,
      hours: Number(((byDate[date] || 0) / 3600).toFixed(2)),
    }));

    const weeklySeconds = weeklyActivity.reduce((sum, d) => sum + d.seconds, 0);
    const weeklyHours = Number((weeklySeconds / 3600).toFixed(2));

    res.json({
      success: true,
      data: {
        username: normalizedUsername,
        activities,
        totalCodingHours,
        weeklyHours,
        weeklyActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { trackActivity, getActivityByUsername };
