export default function SectionHeader({ title, description }) {
  return (
    <div className="mb-4 sm:mb-5">
      <h2 className="text-base font-semibold text-zinc-100 sm:text-lg">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      ) : null}
    </div>
  )
}
