import { useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Panel from '../components/Panel.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import StatCardSkeleton from '../components/StatCardSkeleton.jsx'
import WeeklyActivityChart from '../charts/WeeklyActivityChart.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import EmptyState from '../components/EmptyState.jsx'
import useActivity from '../hooks/useActivity.js'

export default function ActivityStats() {
  const [params] = useSearchParams()
  const username = params.get('username') || ''

  const {
    loading,
    error,
    totalCodingHours,
    weeklyHours,
    weeklyActivity,
    hasActivity,
  } = useActivity(username)

  return (
    <Layout
      title="Activity"
      description={username ? `@${username}` : 'Local coding tracker'}
    >
      <div className="flex flex-col gap-8">
        <Panel>
          <SectionHeader
            title="Activity stats"
            description="Coding sessions recorded by the DevTrace local tracker."
          />
          <p className="text-sm text-zinc-500">
            User{' '}
            <span className="font-medium text-zinc-300">
              {username ? `@${username}` : '—'}
            </span>
          </p>
          {!username ? (
            <p className="mt-4 text-sm text-zinc-500">
              Enter a username on Home first, then return here via the sidebar.
            </p>
          ) : null}
        </Panel>

        {username && loading ? (
          <section>
            <LoadingSpinner label="Loading activity data…" />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          </section>
        ) : null}

        <ErrorAlert message={username && !loading ? error : ''} />

        {username && !loading && !error && hasActivity ? (
          <section>
            <SectionHeader
              title="Summary"
              description="All-time and weekly totals from tracked sessions."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatCard
                label="Total coding hours"
                value={totalCodingHours}
                subtext="All tracked sessions"
              />
              <StatCard
                label="This week"
                value={weeklyHours}
                subtext="Last 7 days"
              />
            </div>
          </section>
        ) : null}

        {username && !loading && !error && !hasActivity ? (
          <EmptyState
            title="No activity found yet"
            description="Start the tracker with your username to record coding sessions. Data appears here within a minute."
          />
        ) : null}

        {username ? (
          <section>
            <WeeklyActivityChart data={weeklyActivity} loading={loading} />
          </section>
        ) : null}

        <Panel>
          <SectionHeader
            title="Run the tracker"
            description="Keep this script running while you code locally."
          />
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-left text-xs text-zinc-400 sm:text-sm">
{`cd tracker
npm install
cp .env.example .env
# Set TRACKER_USERNAME to match dashboard username
npm start`}
          </pre>
        </Panel>
      </div>
    </Layout>
  )
}
