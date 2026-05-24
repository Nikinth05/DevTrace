const validateEnv = () => {
  const required = ['MONGODB_URI'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }

  if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL) {
    console.warn(
      'Warning: CLIENT_URL is not set. CORS may block production frontend requests.'
    );
  }
};

module.exports = { validateEnv };
