module.exports = {
  baseURL: "https://api.github.com",
  // Limit repo/commit fetches to stay within GitHub rate limits
  maxReposForCommits: 10,
  maxReposForLanguages: 30,
  commitsPerRepo: 30,
};
