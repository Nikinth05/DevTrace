import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import { CHART_AXIS_STROKE, CHART_GRID_STROKE, CHART_TOOLTIP_STYLE } from './chartTheme.js'

export default function CommitsLineChart({ data, loading }) {
  const chartData = Array.isArray(data) ? data : []
  const isEmpty = chartData.length === 0

  return (
    <ChartCard
      title="Commits per day"
      description="Recent commit frequency from sampled public repositories."
      loading={loading}
      empty={!loading && isEmpty}
      emptyTitle="No commit data"
      emptyDescription="This user may have no recent public commits in sampled repos."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke={CHART_GRID_STROKE} />
          <XAxis
            dataKey="date"
            stroke={CHART_AXIS_STROKE}
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => (v ? String(v).slice(5) : '')}
          />
          <YAxis stroke={CHART_AXIS_STROKE} tick={{ fontSize: 11 }} allowDecimals={false} />
          <Tooltip {...CHART_TOOLTIP_STYLE} />
          <Line
            type="monotone"
            dataKey="count"
              stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
