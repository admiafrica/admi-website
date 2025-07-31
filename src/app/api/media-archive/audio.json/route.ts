import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    // Try to read the static file first
    const filePath = join(process.cwd(), 'public', 'api', 'media-archive', 'audio.json')
    const fileContent = readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContent)

    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error serving audio.json:', error)

    // Fallback response
    const fallbackResponse = {
      success: true,
      audio: [],
      count: 0,
      generated: new Date().toISOString(),
      source: 'api-fallback',
      error: 'Static file not found'
    }

    return NextResponse.json(fallbackResponse, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    })
  }
}
