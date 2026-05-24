export default function StatCard({ label, value, subtext }) {
  return (
    <div className="group flex h-full min-h-[7.5rem] flex-col justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-4 shadow-sm shadow-black/10 transition hover:border-zinc-700/80 hover:bg-zinc-900/80 hover:shadow-md hover:shadow-black/20 sm:p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
        {value ?? '—'}
      </div>
      {subtext ? (
        <div className="mt-2 text-xs text-zinc-500">{subtext}</div>
      ) : (
        <div className="mt-2 h-4" aria-hidden="true" />
      )}
    </div>
  )
}
