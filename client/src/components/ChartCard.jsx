import EmptyState from './EmptyState.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

export default function ChartCard({
  title,
  description,
  children,
  loading = false,
  empty = false,
  emptyTitle = 'No data yet',
  emptyDescription,
}) {
  return (
    <div className="card-surface flex h-full min-h-[20rem] min-w-0 flex-col p-4 transition hover:border-zinc-700/60 sm:p-5">
      <div className="mb-4 border-b border-zinc-800/60 pb-4">
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
        {description ? (
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
        ) : null}
      </div>

      <div className="min-h-0 min-w-0 flex-1">
        {loading ? (
          <div className="flex h-56 items-center justify-center sm:h-64">
            <LoadingSpinner label="Loading chart…" />
          </div>
        ) : empty ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <div className="h-56 w-full min-w-0 sm:h-64">{children}</div>
        )}
      </div>
    </div>
  )
}
