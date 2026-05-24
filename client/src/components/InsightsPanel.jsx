import Panel from './Panel.jsx'
import SectionHeader from './SectionHeader.jsx'
import StatCard from './StatCard.jsx'
import StatCardSkeleton from './StatCardSkeleton.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'
import ErrorAlert from './ErrorAlert.jsx'
import EmptyState from './EmptyState.jsx'

export default function InsightsPanel({ username, loading, error, insights }) {
  if (!username) {
    return (
      <Panel>
        <SectionHeader
          title="Productivity insights"
          description="Enter a username on Home to see rule-based analytics."
        />
      </Panel>
    )
  }

  return (
    <Panel>
      <SectionHeader
        title="Productivity insights"
        description="Streaks, averages, and patterns from your local tracker data."
      />

      {loading ? (
        <div className="space-y-4">
          <LoadingSpinner label="Loading productivity insights…" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : null}

      <ErrorAlert message={!loading ? error : ''} />

      {!loading && !error && insights?.hasActivity ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total coding hours"
            value={insights.totalCodingHours}
            subtext="All tracked sessions"
          />
          <StatCard
            label="Coding streak"
            value={`${insights.codingStreak} days`}
            subtext="Consecutive active days"
          />
          <StatCard
            label="Most active day"
            value={insights.mostActiveDay || '—'}
            subtext="Weekday with most coding"
          />
          <StatCard
            label="Weekly average"
            value={`${insights.weeklyAverageHours} hrs/day`}
            subtext="Last 7 calendar days"
          />
        </div>
      ) : null}

      {!loading && !error && insights && !insights.hasActivity ? (
        <EmptyState
          title="No activity found yet"
          description="Run the tracker script with your username to collect local coding time."
        />
      ) : null}
    </Panel>
  )
}
