import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
  const params = await context.params

  try {
    // Construct the CloudFront URL
    const audioUrl = `https://d17qqznw1g499t.cloudfront.net/media-archive/audio/${params.filename}`

    // Fetch the audio file from CloudFront
    const audioResponse = await fetch(audioUrl)

    if (!audioResponse.ok) {
      return NextResponse.json({ error: 'Audio file not found' }, { status: 404 })
    }

    // Get the audio data
    const audioBuffer = await audioResponse.arrayBuffer()

    // Detect if this is actually an MP4 file despite .mp3 extension
    const buffer = new Uint8Array(audioBuffer)
    const isMP4 =
      buffer.length > 8 && buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70 // 'ftyp' signature

    // Set correct content type based on actual file format
    const contentType = isMP4 ? 'audio/mp4' : audioResponse.headers.get('content-type') || 'audio/mpeg'

    console.log(`Audio proxy serving ${params.filename}: detected ${isMP4 ? 'MP4' : 'MP3'} format`)

    // Return the audio with proper CORS headers
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': audioResponse.headers.get('content-length') || '',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Range',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Cache-Control': 'public, max-age=31536000' // 1 year cache
      }
    })
  } catch (error) {
    console.error('Error proxying audio file:', error)
    return NextResponse.json({ error: 'Failed to load audio file' }, { status: 500 })
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Range',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS'
    }
  })
}
