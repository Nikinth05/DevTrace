const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    date: {
      type: String,
      required: true,
      // YYYY-MM-DD for simple daily aggregation
    },
    codingTime: {
      type: Number,
      required: true,
      default: 0,
      // Stored in seconds
    },
  },
  { timestamps: true }
);

activitySchema.index({ username: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Activity", activitySchema);
