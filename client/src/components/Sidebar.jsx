import { NavLink, useSearchParams } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  [
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
    isActive
      ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20'
      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100',
  ].join(' ')

function NavIcon({ children }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-800/80 text-zinc-400">
      {children}
    </span>
  )
}

export default function Sidebar({ open, onClose }) {
  const [params] = useSearchParams()
  const username = params.get('username')
  const query = username ? `?username=${encodeURIComponent(username)}` : ''

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      <NavLink to="/" className={linkClass} end onClick={onClose}>
        <NavIcon>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </NavIcon>
        Home
      </NavLink>
      <NavLink to={`/dashboard${query}`} className={linkClass} onClick={onClose}>
        <NavIcon>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </NavIcon>
        Dashboard
      </NavLink>
      <NavLink to={`/activity${query}`} className={linkClass} onClick={onClose}>
        <NavIcon>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </NavIcon>
        Activity
      </NavLink>
    </nav>
  )

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      ) : null}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-200 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="border-b border-zinc-800/80 px-4 py-5">
          <p className="text-lg font-bold tracking-tight text-zinc-100">
            Dev<span className="text-blue-500">Trace</span>
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">Developer Analytics</p>
        </div>

        {nav}

        {username ? (
          <div className="mt-auto border-t border-zinc-800/80 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Tracking
            </p>
            <p className="mt-1 truncate text-sm font-medium text-zinc-200">
              @{username}
            </p>
          </div>
        ) : (
          <div className="mt-auto border-t border-zinc-800/80 p-4">
            <p className="text-xs text-zinc-500">No user selected</p>
          </div>
        )}
      </aside>
    </>
  )
}
