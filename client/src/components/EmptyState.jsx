export default function EmptyState({ title, description, icon }) {
  return (
    <div className="flex min-h-[10rem] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700/60 bg-zinc-950/50 px-6 py-10 text-center">
      {icon ? (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-500">
          {icon}
        </div>
      ) : (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/80">
          <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      )}
      <p className="text-sm font-medium text-zinc-200">{title}</p>
      {description ? (
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
          {description}
        </p>
      ) : null}
    </div>
  )
}
