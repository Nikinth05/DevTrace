import { useEffect, useState } from 'react'
import { activityService } from '../services/activity.js'
import { getErrorMessage } from '../utils/errorMessage.js'

export default function useActivity(username) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalCodingHours, setTotalCodingHours] = useState(0)
  const [weeklyHours, setWeeklyHours] = useState(0)
  const [weeklyActivity, setWeeklyActivity] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!username) {
        setTotalCodingHours(0)
        setWeeklyHours(0)
        setWeeklyActivity([])
        setActivities([])
        setError('')
        return
      }

      setLoading(true)
      setError('')

      try {
        const res = await activityService.getByUsername(username)
        if (cancelled) return

        const data = res.data || {}
        setTotalCodingHours(data.totalCodingHours || 0)
        setWeeklyHours(data.weeklyHours || 0)
        setWeeklyActivity(data.weeklyActivity || [])
        setActivities(data.activities || [])
      } catch (e) {
        if (cancelled) return
        setError(getErrorMessage(e, 'Failed to load activity data'))
        setTotalCodingHours(0)
        setWeeklyHours(0)
        setWeeklyActivity([])
        setActivities([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [username])

  const hasActivity = activities.length > 0

  return {
    loading,
    error,
    totalCodingHours,
    weeklyHours,
    weeklyActivity,
    activities,
    hasActivity,
  }
}
