const { githubGet } = require("../utils/githubApi");
const githubConfig = require("../config/github");

/**
 * GET /api/github/user/:username
 * Returns public GitHub profile (avatar, bio, followers, etc.)
 */
const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await githubGet(`/users/${username}`);

    res.json({
      success: true,
      data: {
        username: user.login,
        name: user.name,
        avatar: user.avatar_url,
        bio: user.bio,
        location: user.location,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        profileUrl: user.html_url,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/github/repos/:username
 * Returns public repositories sorted by last update
 */
const getUserRepos = async (req, res, next) => {
  try {
    const { username } = req.params;
    const repos = await githubGet(`/users/${username}/repos`, {
      sort: "updated",
      per_page: 100,
      type: "owner",
    });

    const formattedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      updatedAt: repo.updated_at,
      isFork: repo.fork,
    }));

    res.json({
      success: true,
      count: formattedRepos.length,
      data: formattedRepos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/github/commits/:username
 * Aggregates recent commits from the user's top repos
 */
const getUserCommits = async (req, res, next) => {
  try {
    const { username } = req.params;

    const repos = await githubGet(`/users/${username}/repos`, {
      sort: "pushed",
      per_page: githubConfig.maxReposForCommits,
      type: "owner",
    });

    const commitPromises = repos.map((repo) =>
      githubGet(`/repos/${repo.full_name}/commits`, {
        author: username,
        per_page: githubConfig.commitsPerRepo,
      }).catch(() => [])
    );

    const commitsByRepo = await Promise.all(commitPromises);

    const commits = [];
    commitsByRepo.forEach((repoCommits, index) => {
      const repoName = repos[index]?.full_name;
      repoCommits.forEach((commit) => {
        commits.push({
          sha: commit.sha,
          message: commit.commit.message,
          date: commit.commit.author.date,
          repo: repoName,
          url: commit.html_url,
        });
      });
    });

  // Group commits by date (YYYY-MM-DD) for charting
    const commitsPerDay = {};
    commits.forEach(({ date }) => {
      const day = date.split("T")[0];
      commitsPerDay[day] = (commitsPerDay[day] || 0) + 1;
    });

    const chartData = Object.entries(commitsPerDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      success: true,
      totalCommits: commits.length,
      data: commits,
      chartData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/github/languages/:username
 * Aggregates language usage (bytes) across public repos
 */
const getUserLanguages = async (req, res, next) => {
  try {
    const { username } = req.params;

    const repos = await githubGet(`/users/${username}/repos`, {
      sort: "updated",
      per_page: githubConfig.maxReposForLanguages,
      type: "owner",
    });

    const languagePromises = repos.map((repo) =>
      githubGet(`/repos/${repo.full_name}/languages`).catch(() => ({}))
    );

    const languagesByRepo = await Promise.all(languagePromises);

    const aggregated = {};
    languagesByRepo.forEach((langs) => {
      Object.entries(langs).forEach(([language, bytes]) => {
        aggregated[language] = (aggregated[language] || 0) + bytes;
      });
    });

    const sorted = Object.entries(aggregated)
      .map(([language, bytes]) => ({ language, bytes }))
      .sort((a, b) => b.bytes - a.bytes);

    const mostUsed = sorted[0]?.language || null;

    res.json({
      success: true,
      mostUsedLanguage: mostUsed,
      data: sorted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  getUserRepos,
  getUserCommits,
  getUserLanguages,
};
