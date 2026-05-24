import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import { CHART_AXIS_STROKE, CHART_GRID_STROKE, CHART_TOOLTIP_STYLE } from './chartTheme.js'

export default function WeeklyActivityChart({ data, loading }) {
  const chartData = (Array.isArray(data) ? data : []).map((d) => ({
    date: d.date?.slice(5) || '',
    hours: d.hours ?? 0,
  }))

  const hasData = chartData.some((d) => d.hours > 0)

  return (
    <ChartCard
      title="Weekly coding activity"
      description="Hours logged per day from the local DevTrace tracker."
      loading={loading}
      empty={!loading && !hasData}
      emptyTitle="No activity found yet"
      emptyDescription="Run the local tracker script to start recording coding time."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid stroke={CHART_GRID_STROKE} />
          <XAxis dataKey="date" stroke={CHART_AXIS_STROKE} tick={{ fontSize: 11 }} />
          <YAxis stroke={CHART_AXIS_STROKE} tick={{ fontSize: 11 }} />
          <Tooltip {...CHART_TOOLTIP_STYLE} />
          <Bar dataKey="hours" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
