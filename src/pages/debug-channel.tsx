import React, { useState } from 'react'

export default function DebugChannelPage() {
  const [channelId, setChannelId] = useState('UCyAYiT5XYUcOaOlzn32qROA')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testChannelId = async () => {
    setLoading(true)
    setResult(null)

    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

      // Test 1: Get channel info
      console.log('Testing channel ID:', channelId)
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
      )

      const channelData = await channelResponse.json()
      console.log('Channel response:', channelData)

      // Test 2: Get videos from this channel
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${API_KEY}`
      )

      const videosData = await videosResponse.json()
      console.log('Videos response:', videosData)

      // Test 3: Try different search queries for ADMI
      const searchQueries = [
        'Africa Digital Media Institute',
        'ADMI Africa',
        'ADMI Kenya',
        'Digital Media Institute Kenya',
        'ADMI Nairobi'
      ]

      let searchData = { items: [] }
      for (const query of searchQueries) {
        try {
          const searchResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=channel&maxResults=10&key=${API_KEY}`
          )

          if (searchResponse.ok) {
            const data = await searchResponse.json()
            if (data.items && data.items.length > 0) {
              searchData = data
              console.log(
                `Found channels with query "${query}":`,
                data.items.map((item: any) => item.snippet.title)
              )
              break
            }
          }
        } catch (error) {
          console.error(`Search failed for query "${query}":`, error)
        }
      }

      console.log('Final search response:', searchData)

      // Test 4: Try to find channel by handle (this might not work with current API)
      let handleData = null
      try {
        const handleResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=@ADMIafrica&type=channel&maxResults=5&key=${API_KEY}`
        )
        if (handleResponse.ok) {
          handleData = await handleResponse.json()
          console.log('Handle search response:', handleData)
        }
      } catch (error) {
        console.error('Handle search failed:', error)
      }

      setResult({
        channelData,
        videosData,
        searchData,
        handleData,
        channelFound: channelData.items && channelData.items.length > 0,
        videosFound: videosData.items ? videosData.items.length : 0,
        searchFound: searchData.items ? searchData.items.length : 0,
        handleFound: handleData?.items ? handleData.items.length : 0
      })
    } catch (error) {
      console.error('Error:', error)
      setResult({ error: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-semibold text-gray-900">Debug ADMI Channel ID</h1>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-2xl font-semibold text-gray-900">Test Channel ID</h3>
        <input
          className="mb-4 h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
          value={channelId}
          onChange={(e: any) => setChannelId(e.target.value)}
        />
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 font-medium text-white transition"
          onClick={testChannelId}
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Test Channel ID'}
        </button>
      </div>

      {result && (
        <div>
          {result.error ? (
            <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
              <p className="font-medium text-gray-700">Error: {result.error}</p>
            </div>
          ) : (
            <div>
              <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Channel Test Results</h4>
                <p className="text-gray-700">
                  <strong>Channel Found:</strong> {result.channelFound ? 'Yes' : 'No'}
                </p>
                <p className="text-gray-700">
                  <strong>Videos Found:</strong> {result.videosFound}
                </p>
                <p className="text-gray-700">
                  <strong>Search Results:</strong> {result.searchFound}
                </p>

                {result.channelFound && result.channelData.items[0] && (
                  <div>
                    <p className="mt-4 text-gray-700">
                      <strong>Channel Name:</strong> {result.channelData.items[0].snippet.title}
                    </p>
                    <p className="text-gray-700">
                      <strong>Description:</strong> {result.channelData.items[0].snippet.description.substring(0, 100)}
                      ...
                    </p>
                    <p className="text-gray-700">
                      <strong>Subscribers:</strong> {result.channelData.items[0].statistics?.subscriberCount || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <strong>Videos:</strong> {result.channelData.items[0].statistics?.videoCount || 'N/A'}
                    </p>
                  </div>
                )}
              </div>

              {result.videosFound > 0 && (
                <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h4 className="mb-4 text-xl font-semibold text-gray-900">Videos from This Channel</h4>
                  {result.videosData.items.map((video: any, index: number) => (
                    <div key={video.id.videoId} style={{ marginBottom: '8px' }}>
                      <p className="font-medium text-gray-700">
                        {index + 1}. {video.snippet.title}
                      </p>
                      <p className="text-sm text-gray-500">Channel: {video.snippet.channelTitle}</p>
                      <p className="text-sm text-gray-500">
                        Published: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {result.searchFound > 0 && (
                <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h4 className="mb-4 text-xl font-semibold text-gray-900">ADMI Channels Found in Search</h4>
                  {result.searchData.items.map((channel: any, index: number) => (
                    <div key={channel.snippet.channelId} style={{ marginBottom: '8px' }}>
                      <p className="font-medium text-gray-700">
                        {index + 1}. {channel.snippet.title}
                      </p>
                      <p className="text-sm text-gray-500">ID: {channel.snippet.channelId}</p>
                      <p className="text-sm text-gray-700">{channel.snippet.description.substring(0, 100)}...</p>
                      {channel.snippet.channelId === channelId && (
                        <p className="text-sm font-medium text-green-600">✅ This matches the test channel ID!</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Raw API Responses</h4>
                <code
                  className="block rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm"
                  style={{ fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}
                >
                  {JSON.stringify(result, null, 2)}
                </code>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h4 className="mb-4 text-xl font-semibold text-gray-900">Channel IDs to Test</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition"
            onClick={() => setChannelId('UCyAYiT5XYUcOaOlzn32qROA')}
          >
            UCyAYiT5XYUcOaOlzn32qROA (Current)
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition"
            onClick={() => setChannelId('UC_x5XG1OV2P6uZZ5FSM9Ttw')}
          >
            UC_x5XG1OV2P6uZZ5FSM9Ttw (Old)
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition"
            onClick={() => setChannelId('UCxxxxxxxxxxxxxxxxxxxxxx')}
          >
            Invalid ID (Test)
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition"
            onClick={() => setChannelId('UC-9-kyTW8ZkZNDHQJ6FgpwQ')}
          >
            UC-9-kyTW8ZkZNDHQJ6FgpwQ (Music)
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition"
            onClick={() => setChannelId('UCuAXFkgsw1L7xaCfnd5JJOw')}
          >
            UCuAXFkgsw1L7xaCfnd5JJOw (Random)
          </button>
        </div>
      </div>
    </div>
  )
}
