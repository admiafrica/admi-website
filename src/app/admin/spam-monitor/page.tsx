'use client'

import { useState, useEffect } from 'react'

interface SpamLog {
  timestamp: string
  ip: string
  url: string
  reason: string
  userAgent: string
  referer: string
}

interface SpamStats {
  totalAttempts: number
  uniqueIPs: number
  topReasons: Array<{ reason: string; count: number }>
  recentAttempts: number
}

export default function SpamMonitorPage() {
  const [stats, setStats] = useState<SpamStats | null>(null)
  const [logs, setLogs] = useState<SpamLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/spam-monitor', {
        headers: {
          Authorization: 'Bearer admin-token'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch spam data')
      }

      const data = await response.json()
      setStats(data.stats)
      setLogs(data.logs)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
          <p className="text-gray-700">Loading spam monitor data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <div className="mb-1 font-semibold">Error</div>
          {error}
        </div>
        <button
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 font-medium text-white transition"
          onClick={fetchData}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-semibold text-gray-900">Spam Monitor Dashboard</h1>

      {stats && (
        <div className="mb-8 grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Spam Attempts</p>
            <p className="text-xl font-medium text-gray-700">{stats.totalAttempts}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Unique IPs</p>
            <p className="text-xl font-medium text-gray-700">{stats.uniqueIPs}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Recent Attempts</p>
            <p className="text-xl font-medium text-gray-700">{stats.recentAttempts}</p>
          </div>
        </div>
      )}

      {stats?.topReasons && stats.topReasons.length > 0 && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">Top Spam Reasons</h3>
          <div className="flex flex-wrap gap-1">
            {stats.topReasons.map((reason, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800"
              >
                {reason.reason} ({reason.count})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">Recent Spam Attempts</h3>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition"
            onClick={fetchData}
          >
            Refresh
          </button>
        </div>

        {logs.length > 0 ? (
          <div className="w-full overflow-auto" style={{ minWidth: 800 }}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-3 text-left">Timestamp</th>
                  <th className="border border-gray-200 p-3 text-left">IP Address</th>
                  <th className="border border-gray-200 p-3 text-left">URL</th>
                  <th className="border border-gray-200 p-3 text-left">Reason</th>
                  <th className="border border-gray-200 p-3 text-left">User Agent</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-3 align-top">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="border border-gray-200 p-3 align-top">{log.ip}</td>
                    <td
                      className="border border-gray-200 p-3 align-top"
                      style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {log.url}
                    </td>
                    <td className="border border-gray-200 p-3 align-top">{log.reason}</td>
                    <td
                      className="border border-gray-200 p-3 align-top"
                      style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {log.userAgent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-8 text-center text-gray-500">No spam attempts recorded yet</p>
        )}
      </div>
    </div>
  )
}
