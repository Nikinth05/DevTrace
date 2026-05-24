require("dotenv").config();

const axios = require("axios");

const API_URL =
  process.env.API_URL || "http://localhost:5001/api/activity/track";
const USERNAME = process.env.TRACKER_USERNAME;
const INTERVAL_MS = Number(process.env.INTERVAL_MS) || 60000;
const CODING_SECONDS = Number(process.env.CODING_SECONDS) || 60;

const getTodayDate = () => new Date().toISOString().split("T")[0];

const sendActivity = async () => {
  try {
    const response = await axios.post(API_URL, {
      username: USERNAME,
      codingTime: CODING_SECONDS,
      date: getTodayDate(),
    });

    const totalToday = response.data?.data?.codingTime;
    console.log(
      `[${new Date().toLocaleTimeString()}] Sent ${CODING_SECONDS}s | Today total: ${totalToday}s`
    );
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Request failed";
    console.error(`[${new Date().toLocaleTimeString()}] Error: ${message}`);
  }
};

if (!USERNAME) {
  console.error("TRACKER_USERNAME is required. Copy .env.example to .env");
  process.exit(1);
}

console.log("DevTrace tracker started");
console.log(`User: ${USERNAME}`);
console.log(`API: ${API_URL}`);
console.log(`Interval: ${INTERVAL_MS}ms`);

sendActivity();
setInterval(sendActivity, INTERVAL_MS);
