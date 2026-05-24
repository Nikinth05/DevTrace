import { useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Panel from '../components/Panel.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import StatCardSkeleton from '../components/StatCardSkeleton.jsx'
import InsightsPanel from '../components/InsightsPanel.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import CommitsLineChart from '../charts/CommitsLineChart.jsx'
import LanguagesPieChart from '../charts/LanguagesPieChart.jsx'
import WeeklyActivityChart from '../charts/WeeklyActivityChart.jsx'
import useGithubDashboard from '../hooks/useGithubDashboard.js'
import useActivity from '../hooks/useActivity.js'
import useInsights from '../hooks/useInsights.js'

export default function Dashboard() {
  const [params] = useSearchParams()
  const username = params.get('username') || ''

  const { loading, error, profile, commits, languages, topStats } =
    useGithubDashboard(username)

  const {
    totalCodingHours,
    weeklyActivity,
    loading: activityLoading,
    error: activityError,
  } = useActivity(username)

  const {
    loading: insightsLoading,
    error: insightsError,
    insights,
  } = useInsights(username)

  const showGithubStats = username && !loading && !error

  return (
    <Layout
      title="Dashboard"
      description={username ? `@${username}` : 'GitHub & local analytics'}
    >
      <div className="flex flex-col gap-8">
        <Panel>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Overview
              </p>
              <h2 className="mt-1 text-2xl font-bold text-zinc-100 sm:text-3xl">
                {username || 'Select a developer'}
              </h2>
            </div>

            {profile ? (
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-950/60 px-4 py-3 transition hover:border-zinc-700 hover:bg-zinc-900/80 sm:w-auto"
              >
                <img
                  src={profile.avatar}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-full ring-2 ring-zinc-800"
                />
                <div className="min-w-0 text-left">
                  <p className="truncate font-medium text-zinc-100">
                    {profile.name || profile.username}
                  </p>
                  <p className="truncate text-sm text-zinc-500">
                    {profile.bio || 'View on GitHub →'}
                  </p>
                </div>
              </a>
            ) : null}
          </div>

          {!username ? (
            <p className="mt-4 text-sm text-zinc-500">
              Go to Home and enter a GitHub username to load analytics.
            </p>
          ) : null}

          {username && loading ? (
            <div className="mt-4">
              <LoadingSpinner label="Loading GitHub analytics…" />
            </div>
          ) : null}

          <div className="mt-4">
            <ErrorAlert message={username && !loading ? error : ''} />
          </div>
        </Panel>

        {username ? (
          <section>
            <SectionHeader
              title="Key metrics"
              description="GitHub activity and local coding time at a glance."
            />
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : null}
            {showGithubStats ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Repositories" value={topStats.totalRepos} />
                <StatCard label="Recent commits" value={topStats.totalCommits} />
                <StatCard
                  label="Top language"
                  value={topStats.mostUsedLanguage || '—'}
                  subtext="By repo bytes"
                />
                <StatCard
                  label="Coding hours"
                  value={activityLoading ? '…' : totalCodingHours}
                  subtext="Local tracker"
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {username ? (
          <>
            <InsightsPanel
              username={username}
              loading={insightsLoading}
              error={insightsError}
              insights={insights}
            />

            <section>
              <SectionHeader
                title="Local activity"
                description="Weekly coding hours from the DevTrace tracker."
              />
              {activityError ? (
                <div className="mb-4">
                  <ErrorAlert message={activityError} />
                </div>
              ) : null}
              <WeeklyActivityChart
                data={weeklyActivity}
                loading={activityLoading}
              />
            </section>

            <section>
              <SectionHeader
                title="GitHub analytics"
                description="Commit trends and language breakdown from public repos."
              />
              <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                <CommitsLineChart
                  data={commits.chartData}
                  loading={loading}
                />
                <LanguagesPieChart data={languages.data} loading={loading} />
              </div>
            </section>
          </>
        ) : null}
      </div>
    </Layout>
  )
}
