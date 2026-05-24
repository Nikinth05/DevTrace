const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toDateString = (date) => date.toISOString().split("T")[0];

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toDateString(d));
  }
  return days;
};

const secondsToHours = (seconds) => Number((seconds / 3600).toFixed(2));

/**
 * Streak = consecutive calendar days with coding activity,
 * counting backward from today. If today has no activity yet,
 * we start from yesterday (common "current streak" behavior).
 */
const calculateCodingStreak = (activities) => {
  const activeDates = new Set(
    activities.filter((a) => a.codingTime > 0).map((a) => a.date)
  );

  if (activeDates.size === 0) return 0;

  let streak = 0;
  const cursor = new Date();

  if (!activeDates.has(toDateString(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (activeDates.has(toDateString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

/**
 * Finds which weekday (Mon, Tue, …) has the highest total coding time.
 */
const calculateMostActiveDay = (activities) => {
  const totalsByWeekday = Array(7).fill(0);

  activities.forEach(({ date, codingTime }) => {
    const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
    totalsByWeekday[weekday] += codingTime;
  });

  const maxSeconds = Math.max(...totalsByWeekday);
  if (maxSeconds === 0) return null;

  const index = totalsByWeekday.indexOf(maxSeconds);
  return DAY_NAMES[index];
};

/**
 * Average hours per day over the last 7 calendar days.
 */
const calculateWeeklyAverageHours = (activities) => {
  const byDate = Object.fromEntries(
    activities.map((a) => [a.date, a.codingTime])
  );

  const last7Days = getLast7Days();
  const totalSeconds = last7Days.reduce(
    (sum, date) => sum + (byDate[date] || 0),
    0
  );

  // Use 3 decimals so short sessions still show (e.g. 2 min/day)
  return Number((totalSeconds / 7 / 3600).toFixed(3));
};

const calculateInsights = (activities) => {
  const totalSeconds = activities.reduce((sum, a) => sum + a.codingTime, 0);

  return {
    totalCodingHours: secondsToHours(totalSeconds),
    codingStreak: calculateCodingStreak(activities),
    mostActiveDay: calculateMostActiveDay(activities),
    weeklyAverageHours: calculateWeeklyAverageHours(activities),
  };
};

module.exports = {
  calculateInsights,
  calculateCodingStreak,
  calculateMostActiveDay,
  calculateWeeklyAverageHours,
};
