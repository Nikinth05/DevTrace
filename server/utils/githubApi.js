const axios = require("axios");

const githubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
});

const handleGitHubError = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 404) {
      const err = new Error("GitHub user not found");
      err.statusCode = 404;
      throw err;
    }

    if (status === 403 && data.message?.includes("rate limit")) {
      const err = new Error(
        "GitHub API rate limit exceeded. Add GITHUB_TOKEN to .env for higher limits."
      );
      err.statusCode = 429;
      throw err;
    }

    const err = new Error(data.message || "GitHub API request failed");
    err.statusCode = status;
    throw err;
  }

  throw error;
};

const githubGet = async (url, params = {}) => {
  try {
    const response = await githubClient.get(url, { params });
    return response.data;
  } catch (error) {
    handleGitHubError(error);
  }
};

module.exports = { githubGet };
