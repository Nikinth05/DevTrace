export default function StatCardSkeleton() {
  return (
    <div className="h-full min-h-[7.5rem] animate-pulse rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 sm:p-5">
      <div className="h-3 w-20 rounded bg-zinc-800" />
      <div className="mt-4 h-9 w-14 rounded bg-zinc-800" />
      <div className="mt-3 h-3 w-28 rounded bg-zinc-800/80" />
    </div>
  )
}
