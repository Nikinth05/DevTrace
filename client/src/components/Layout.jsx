import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

export default function Layout({ children, title, description }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-gradient flex min-h-screen bg-zinc-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
        <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="min-w-0 lg:hidden">
                <Link to="/" className="text-sm font-bold text-zinc-100">
                  Dev<span className="text-blue-500">Trace</span>
                </Link>
              </div>

              {title ? (
                <div className="hidden min-w-0 sm:block">
                  <h1 className="truncate text-lg font-semibold text-zinc-100">
                    {title}
                  </h1>
                  {description ? (
                    <p className="truncate text-sm text-zinc-500">{description}</p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              API connected
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
