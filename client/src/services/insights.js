import { api } from './api.js'

export const insightsService = {
  getByUsername: (username) =>
    api.get(`/insights/${username}`).then((r) => r.data),
}
