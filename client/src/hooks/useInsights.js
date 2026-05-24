import { useEffect, useState } from 'react'
import { insightsService } from '../services/insights.js'
import { getErrorMessage } from '../utils/errorMessage.js'

export default function useInsights(username) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [insights, setInsights] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!username) {
        setInsights(null)
        setError('')
        return
      }

      setLoading(true)
      setError('')

      try {
        const res = await insightsService.getByUsername(username)
        if (cancelled) return
        setInsights(res.data || null)
      } catch (e) {
        if (cancelled) return
        setError(getErrorMessage(e, 'Failed to load insights'))
        setInsights(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [username])

  return { loading, error, insights }
}
