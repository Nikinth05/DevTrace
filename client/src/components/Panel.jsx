export default function Panel({ children, className = '', noPadding = false }) {
  return (
    <section
      className={`card-surface ${noPadding ? '' : 'p-5 sm:p-6'} ${className}`}
    >
      {children}
    </section>
  )
}
