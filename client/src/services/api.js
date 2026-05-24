import axios from 'axios'

// Dev: Vite proxy uses /api → localhost backend
// Prod: set VITE_API_URL to your Render backend (e.g. https://devtrace-api.onrender.com)
const apiBase = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api'

export const api = axios.create({
  baseURL: apiBase,
  timeout: 30000,
})
