import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import { CHART_COLORS, CHART_TOOLTIP_STYLE } from './chartTheme.js'

export default function LanguagesPieChart({ data, loading }) {
  const top = (Array.isArray(data) ? data : []).slice(0, 8)
  const isEmpty = top.length === 0

  return (
    <ChartCard
      title="Language distribution"
      description="Share of code bytes across public repositories."
      loading={loading}
      empty={!loading && isEmpty}
      emptyTitle="No language data"
      emptyDescription="No language bytes found across public repositories."
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={top}
            dataKey="bytes"
            nameKey="language"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={2}
          >
            {top.map((entry, index) => (
              <Cell
                key={entry.language || index}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip {...CHART_TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
