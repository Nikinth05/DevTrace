const cors = require('cors');

const getAllowedOrigins = () => {
  if (process.env.CLIENT_URL) {
    return process.env.CLIENT_URL.split(',').map((url) => url.trim());
  }

  return ['http://localhost:5173', 'http://127.0.0.1:5173'];
};

const corsOptions = {
  origin(origin, callback) {
    const allowed = getAllowedOrigins();

    // Allow non-browser tools (Postman, tracker script) with no Origin header
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
};

module.exports = cors(corsOptions);
