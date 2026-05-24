import { api } from './api.js'

export const activityService = {
  track: (payload) => api.post('/activity/track', payload).then((r) => r.data),
  getByUsername: (username) =>
    api.get(`/activity/${username}`).then((r) => r.data),
}
