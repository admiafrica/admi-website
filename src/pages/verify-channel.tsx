import React, { useState, useEffect } from 'react'

export default function VerifyChannelPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    verifyChannel()
  }, [])

  const verifyChannel = async () => {
    setLoading(true)
    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      const CHANNEL_ID = 'UCqLmokG6Req2pHn2p7D8WZQ' // Correct ID from page source

      console.log('🔍 Testing Channel ID:', CHANNEL_ID)

      // Test 1: Get channel information
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${CHANNEL_ID}&key=${API_KEY}`
      )

      if (!channelResponse.ok) {
        throw new Error(`Channel API failed: ${channelResponse.status}`)
      }

      const channelData = await channelResponse.json()
      console.log('📺 Channel Data:', channelData)

      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found with this ID')
      }

      const channel = channelData.items[0]

      // Test 2: Get recent videos from this channel
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=5&order=date&type=video&key=${API_KEY}`
      )

      let videos: any[] = []
      if (videosResponse.ok) {
        const videosData = await videosResponse.json()
        videos = videosData.items || []
        console.log('🎥 Videos found:', videos.length)
      }

      // Test 3: Check if this looks like ADMI
      const isLikelyADMI =
        channel.snippet.title.toLowerCase().includes('admi') ||
        channel.snippet.title.toLowerCase().includes('africa') ||
        channel.snippet.title.toLowerCase().includes('digital') ||
        channel.snippet.title.toLowerCase().includes('media') ||
        channel.snippet.description.toLowerCase().includes('admi') ||
        channel.snippet.description.toLowerCase().includes('africa digital media')

      setResult({
        channel,
        videos,
        isLikelyADMI,
        channelId: CHANNEL_ID,
        success: true
      })
    } catch (error) {
      console.error('❌ Error:', error)
      setResult({
        error: (error as Error).message,
        success: false
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-semibold text-gray-900">Verify ADMI YouTube Channel ID</h1>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div style={{ textAlign: 'center' }}>
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
            <p className="text-gray-700">Verifying channel ID: UCqLmokG6Req2pHn2p7D8WZQ</p>
          </div>
        </div>
      ) : result?.success ? (
        <div>
          <div
            className={`mb-4 rounded-lg border p-4 ${result.isLikelyADMI ? 'border-green-300 bg-green-50 text-green-900' : 'border-amber-300 bg-amber-50 text-amber-900'}`}
          >
            <p className="font-medium text-gray-700">
              {result.isLikelyADMI ? '✅ This looks like the ADMI channel!' : '⚠️ This might not be the ADMI channel'}
            </p>
          </div>

          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Channel Information</h3>
            <p className="text-gray-700">
              <strong>Channel Name:</strong> {result.channel.snippet.title}
            </p>
            <p className="text-gray-700">
              <strong>Channel ID:</strong> {result.channelId}
            </p>
            <p className="text-gray-700">
              <strong>Subscribers:</strong> {result.channel.statistics.subscriberCount?.toLocaleString() || 'Hidden'}
            </p>
            <p className="text-gray-700">
              <strong>Total Videos:</strong> {result.channel.statistics.videoCount?.toLocaleString() || 'Unknown'}
            </p>
            <p className="text-gray-700">
              <strong>Total Views:</strong> {result.channel.statistics.viewCount?.toLocaleString() || 'Unknown'}
            </p>
            <p className="text-gray-700">
              <strong>Created:</strong> {new Date(result.channel.snippet.publishedAt).toLocaleDateString()}
            </p>

            <h4 className="mb-1 mt-4 text-xl font-semibold text-gray-900">Description:</h4>
            <p className="text-sm text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>
              {result.channel.snippet.description.substring(0, 300)}
              {result.channel.snippet.description.length > 300 && '...'}
            </p>
          </div>

          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Recent Videos ({result.videos.length})</h3>
            {result.videos.length > 0 ? (
              result.videos.map((video: any, index: number) => (
                <div
                  key={video.id.videoId}
                  style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #eee' }}
                >
                  <p className="font-medium text-gray-700">
                    {index + 1}. {video.snippet.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Published: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">Channel: {video.snippet.channelTitle}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent videos found</p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Verification Checklist</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="text-sm text-gray-700">
                {result.channel.snippet.title.toLowerCase().includes('admi') ? '✅' : '❌'} Channel name contains "ADMI"
              </p>
              <p className="text-sm text-gray-700">
                {result.channel.snippet.title.toLowerCase().includes('africa') ? '✅' : '❌'} Channel name contains
                "Africa"
              </p>
              <p className="text-sm text-gray-700">
                {result.channel.snippet.description.toLowerCase().includes('digital media') ? '✅' : '❌'} Description
                mentions "digital media"
              </p>
              <p className="text-sm text-gray-700">{result.videos.length > 0 ? '✅' : '❌'} Has recent videos</p>
              <p className="text-sm text-gray-700">
                {parseInt(result.channel.statistics.subscriberCount) > 100 ? '✅' : '❌'} Has reasonable subscriber
                count
              </p>
            </div>
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition ${result.isLikelyADMI ? 'bg-green-600' : 'bg-orange-500'}`}
              onClick={() => {
                if (result.isLikelyADMI) {
                  alert('✅ This appears to be the correct ADMI channel! You can use this channel ID.')
                } else {
                  alert('⚠️ This might not be the ADMI channel. Please verify manually.')
                }
              }}
            >
              {result.isLikelyADMI ? 'Confirm This Channel' : 'Need Different Channel'}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <div className="mb-1 font-semibold">Error</div>
          <p className="font-medium text-gray-700">❌ Error verifying channel</p>
          <p className="text-sm text-gray-700">{result?.error}</p>
          <button
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-900 transition"
            onClick={verifyChannel}
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h4 className="mb-4 text-xl font-semibold text-gray-900">How to Find the Correct Channel ID</h4>
        <p className="mb-1 text-sm text-gray-700">
          1. Go to the ADMI YouTube channel: https://www.youtube.com/@ADMIafrica
        </p>
        <p className="mb-1 text-sm text-gray-700">2. Right-click and "View page source"</p>
        <p className="mb-1 text-sm text-gray-700">3. Search for "channelId" or "externalId"</p>
        <p className="mb-1 text-sm text-gray-700">4. Copy the ID that starts with "UC"</p>
        <p className="text-sm text-gray-700">5. Test it here to verify it's correct</p>
      </div>
    </div>
  )
}
