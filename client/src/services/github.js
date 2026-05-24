import { api } from './api'

export const githubService = {
  getUser: (username) => api.get(`/github/user/${username}`).then((r) => r.data),
  getRepos: (username) => api.get(`/github/repos/${username}`).then((r) => r.data),
  getCommits: (username) =>
    api.get(`/github/commits/${username}`).then((r) => r.data),
  getLanguages: (username) =>
    api.get(`/github/languages/${username}`).then((r) => r.data),
}

