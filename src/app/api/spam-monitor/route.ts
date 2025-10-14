import { NextRequest, NextResponse } from 'next/server'

// In production, this should be stored in a database or external service
interface SpamLog {
  timestamp: string
  ip: string
  url: string
  reason: string
  userAgent: string
  referer: string
}

// Simple in-memory store (use Redis/database in production)
const spamLogs: SpamLog[] = []
const MAX_LOGS = 1000

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const logEntry: SpamLog = {
      timestamp: new Date().toISOString(),
      ip: data.ip || 'unknown',
      url: data.url || '',
      reason: data.reason || '',
      userAgent: data.userAgent || 'unknown',
      referer: data.referer || 'none'
    }

    // Add to logs (keep only last MAX_LOGS entries)
    spamLogs.unshift(logEntry)
    if (spamLogs.length > MAX_LOGS) {
      spamLogs.splice(MAX_LOGS)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Spam monitor error:', error)
    return NextResponse.json({ error: 'Failed to log spam attempt' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Simple authentication check - in production use proper auth
  const authHeader = request.headers.get('authorization')
  if (!authHeader || authHeader !== 'Bearer admin-token') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 500)
  const offset = parseInt(searchParams.get('offset') || '0')

  const results = spamLogs.slice(offset, offset + limit)

  // Get statistics
  const stats = {
    totalAttempts: spamLogs.length,
    uniqueIPs: new Set(spamLogs.map((log) => log.ip)).size,
    topReasons: getTopReasons(),
    recentAttempts: results.length
  }

  return NextResponse.json({
    stats,
    logs: results
  })
}

function getTopReasons(): Array<{ reason: string; count: number }> {
  const reasonCounts = new Map<string, number>()

  spamLogs.forEach((log) => {
    const reason = log.reason.split(':')[0] // Get the main reason type
    reasonCounts.set(reason, (reasonCounts.get(reason) || 0) + 1)
  })

  return Array.from(reasonCounts.entries())
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}
