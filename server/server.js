require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const corsMiddleware = require("./config/cors");
const { validateEnv } = require("./config/env");
const githubRoutes = require("./routes/githubRoutes");
const activityRoutes = require("./routes/activityRoutes");
const insightsRoutes = require("./routes/insightsRoutes");
const errorHandler = require("./middleware/errorHandler");

validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(corsMiddleware);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "DevTrace API is running",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/github", githubRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/insights", insightsRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`DevTrace server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
