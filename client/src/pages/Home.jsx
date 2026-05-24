import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'

export default function Home() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const u = username.trim()
    if (!u) return
    navigate(`/dashboard?username=${encodeURIComponent(u)}`)
  }

  return (
    <Layout title="Home" description="Get started with DevTrace">
      <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Developer analytics platform
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
            Understand your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              coding habits
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            Connect a GitHub profile, visualize commits and languages, and track
            local coding time — all in one minimal dashboard.
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 w-full max-w-md"
          >
            <label htmlFor="github-username" className="sr-only">
              GitHub username
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="github-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="GitHub username"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3.5 text-zinc-100 shadow-inner shadow-black/20 outline-none transition placeholder:text-zinc-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
              >
                Open dashboard
              </button>
            </div>
          </form>

          <div className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            {[
              { title: 'GitHub stats', desc: 'Repos, commits, languages' },
              { title: 'Local tracker', desc: 'Record coding sessions' },
              { title: 'Insights', desc: 'Streaks and weekly averages' },
            ].map((item) => (
              <div
                key={item.title}
                className="card-surface p-4 transition hover:border-zinc-700/60"
              >
                <p className="text-sm font-medium text-zinc-200">{item.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
