import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
  const params = await context.params

  try {
    // Construct the CloudFront URL
    const audioUrl = `https://d17qqznw1g499t.cloudfront.net/media-archive/audio/${params.filename}`

    // Handle Range requests for audio streaming
    const range = request.headers.get('range')
    const fetchHeaders: HeadersInit = {}
    if (range) {
      fetchHeaders.Range = range
    }

    // Fetch the audio file from CloudFront
    const audioResponse = await fetch(audioUrl, { headers: fetchHeaders })

    if (!audioResponse.ok) {
      return NextResponse.json({ error: 'Audio file not found' }, { status: 404 })
    }

    // Get the audio data
    const audioBuffer = await audioResponse.arrayBuffer()

    // Detect actual file format from binary signatures
    const buffer = new Uint8Array(audioBuffer)
    const isMP4 =
      buffer.length > 8 && buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70 // 'ftyp' signature
    const isWAV =
      buffer.length > 12 &&
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 && // 'RIFF'
      buffer[8] === 0x57 &&
      buffer[9] === 0x41 &&
      buffer[10] === 0x56 &&
      buffer[11] === 0x45 // 'WAVE'

    // Set correct content type based on actual file format
    let contentType = audioResponse.headers.get('content-type') || 'audio/mpeg'
    if (isMP4) {
      contentType = 'audio/mp4'
    } else if (isWAV) {
      contentType = 'audio/wav'
    }

    const detectedFormat = isMP4 ? 'MP4' : isWAV ? 'WAV' : 'MP3'
    console.log(
      `Audio proxy serving ${params.filename}: detected ${detectedFormat} format, content-type: ${contentType}`
    )

    // Return the audio with proper CORS headers and range support
    const responseHeaders: HeadersInit = {
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Range',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Cache-Control': 'public, max-age=31536000' // 1 year cache
    }

    // Handle partial content responses
    const status = audioResponse.status === 206 ? 206 : 200
    if (audioResponse.headers.get('content-range')) {
      responseHeaders['Content-Range'] = audioResponse.headers.get('content-range')!
    }
    if (audioResponse.headers.get('content-length')) {
      responseHeaders['Content-Length'] = audioResponse.headers.get('content-length')!
    }

    return new NextResponse(audioBuffer, {
      status,
      headers: responseHeaders
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
