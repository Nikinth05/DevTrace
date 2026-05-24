import { useEffect, useMemo, useState } from 'react'
import { githubService } from '../services/github.js'
import { getErrorMessage } from '../utils/errorMessage.js'

export default function useGithubDashboard(username) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [commits, setCommits] = useState({ totalCommits: 0, chartData: [] })
  const [languages, setLanguages] = useState({
    mostUsedLanguage: null,
    data: [],
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!username) {
        setProfile(null)
        setRepos([])
        setCommits({ totalCommits: 0, chartData: [] })
        setLanguages({ mostUsedLanguage: null, data: [] })
        setError('')
        return
      }

      setLoading(true)
      setError('')

      try {
        const [userRes, reposRes, commitsRes, langsRes] = await Promise.all([
          githubService.getUser(username),
          githubService.getRepos(username),
          githubService.getCommits(username),
          githubService.getLanguages(username),
        ])

        if (cancelled) return

        setProfile(userRes.data)
        setRepos(reposRes.data || [])
        setCommits({
          totalCommits: commitsRes.totalCommits || 0,
          chartData: commitsRes.chartData || [],
        })
        setLanguages({
          mostUsedLanguage: langsRes.mostUsedLanguage || null,
          data: langsRes.data || [],
        })
      } catch (e) {
        if (cancelled) return
        const status = e?.response?.status
        const message =
          status === 404
            ? 'GitHub user not found'
            : getErrorMessage(e, 'Failed to load GitHub analytics')
        setError(message)
        setProfile(null)
        setRepos([])
        setCommits({ totalCommits: 0, chartData: [] })
        setLanguages({ mostUsedLanguage: null, data: [] })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [username])

  const topStats = useMemo(
    () => ({
      totalRepos: repos.length,
      totalCommits: commits.totalCommits,
      mostUsedLanguage: languages.mostUsedLanguage,
    }),
    [repos.length, commits.totalCommits, languages.mostUsedLanguage]
  )

  return { loading, error, profile, repos, commits, languages, topStats }
}
