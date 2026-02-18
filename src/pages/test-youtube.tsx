import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { IconCheck, IconX, IconLoader } from '@tabler/icons-react'

// Simple test page to verify YouTube API integration
export default function TestYouTubePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    testYouTubeAPI()
  }, [])

  const testYouTubeAPI = async () => {
    try {
      setStatus('loading')
      setError('')

      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      const CHANNEL_ID = process.env.NEXT_PUBLIC_ADMI_YOUTUBE_CHANNEL_ID || 'UCyAYiT5XYUcOaOlzn32qROA'

      if (!API_KEY) {
        throw new Error('YouTube API key not found in environment variables')
      }

      // First, let's search for ADMI channels to find the correct ID
      console.log('🔍 Searching for ADMI channels...')

      // Try multiple search terms to find the channel
      const searchQueries = ['Africa Digital Media Institute ADMI', 'ADMI Africa', '@ADMIafrica', 'ADMIafrica']

      let searchData = null
      for (const query of searchQueries) {
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
      }

      if (!searchData) {
        throw new Error('No ADMI channels found with any search query')
      }

      console.log('Search results:', searchData)

      // Test the current channel ID
      console.log('Testing channel ID:', CHANNEL_ID)
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
      )

      let channelData = null
      if (channelResponse.ok) {
        channelData = await channelResponse.json()
        console.log('Channel data:', channelData)
      } else {
        console.error('Channel response error:', channelResponse.status)
      }

      // Get videos specifically from the ADMI channel ID
      console.log('Fetching videos for channel:', CHANNEL_ID)
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&order=date&type=video&key=${API_KEY}`
      )

      let videosData = null
      if (videosResponse.ok) {
        videosData = await videosResponse.json()
        console.log('Videos data:', videosData)
        console.log('Videos found:', videosData.items?.length || 0)

        // Log each video's channel to verify
        videosData.items?.forEach((video: any, index: number) => {
          console.log(`Video ${index + 1}:`, {
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            channelId: video.snippet.channelId
          })
        })
      } else {
        console.error('Videos response error:', videosResponse.status)
        const errorData = await videosResponse.json()
        console.error('Error details:', errorData)
      }

      setResult({
        searchResults: searchData?.items || [],
        channel: channelData?.items?.[0] || null,
        videos: videosData?.items || [],
        apiKey: API_KEY.substring(0, 10) + '...',
        channelId: CHANNEL_ID,
        channelFound: !!channelData?.items?.[0],
        videosFound: videosData?.items?.length || 0
      })
      setStatus('success')
    } catch (err: any) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-semibold text-gray-900">YouTube API Integration Test</h1>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          {status === 'loading' && <IconLoader className="animate-spin" />}
          {status === 'success' && <IconCheck color="green" />}
          {status === 'error' && <IconX color="red" />}

          <h3 className="text-2xl font-semibold text-gray-900">
            {status === 'loading' && 'Testing YouTube API...'}
            {status === 'success' && 'YouTube API Working!'}
            {status === 'error' && 'YouTube API Error'}
          </h3>
        </div>

        {status === 'error' && (
          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
            <p className="font-medium text-gray-700">Error Details:</p>
            <p className="text-sm text-gray-700">{error}</p>
          </div>
        )}

        {status === 'success' && result && (
          <div>
            <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
              <p className="font-medium text-gray-700">✅ YouTube API is working correctly!</p>
            </div>

            <h4 className="mb-4 text-xl font-semibold text-gray-900">
              Search Results for "ADMI" ({result.searchResults.length} found):
            </h4>
            {result.searchResults.map((channel: any, index: number) => (
              <div
                key={channel.snippet.channelId}
                className="mb-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <p className="font-medium text-gray-700">
                  {index + 1}. {channel.snippet.title}
                </p>
                <p className="text-sm text-gray-500">Channel ID: {channel.snippet.channelId}</p>
                <p className="text-sm text-gray-700">{channel.snippet.description.substring(0, 100)}...</p>
                {channel.snippet.channelId === result.actualChannelId && (
                  <p className="text-sm font-medium text-green-600">← Using this channel</p>
                )}
              </div>
            ))}

            {result.channel && (
              <>
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Channel Information:</h4>
                <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-gray-700">
                    <strong>Name:</strong> {result.channel.snippet.title}
                  </p>
                  <p className="text-gray-700">
                    <strong>Subscribers:</strong> {result.channel.statistics?.subscriberCount || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Videos:</strong> {result.channel.statistics?.videoCount || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Views:</strong> {result.channel.statistics?.viewCount || 'N/A'}
                  </p>
                </div>
              </>
            )}

            <h4 className="mb-4 text-xl font-semibold text-gray-900">Videos from Channel ({result.videos.length}):</h4>
            {result.videos.length > 0 ? (
              result.videos.map((video: any, index: number) => (
                <div key={video.id.videoId} className="mb-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="font-medium text-gray-700">
                    {index + 1}. {video.snippet.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Channel: {video.snippet.channelTitle} (ID: {video.snippet.channelId})
                  </p>
                  <p className="text-sm text-gray-500">
                    Published: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                  {video.snippet.channelId !== result.channelId && (
                    <p className="text-sm font-medium text-red-600">⚠️ This video is NOT from the target channel!</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-orange-600">No videos found for this channel</p>
            )}

            <h4 className="mb-4 text-xl font-semibold text-gray-900">Debug Information:</h4>
            <code className="block rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
              API Key: {result.apiKey}
              {'\n'}Target Channel ID: {result.channelId}
              {'\n'}Channel Found: {result.channelFound ? 'Yes' : 'No'}
              {'\n'}Videos Found: {result.videosFound}
              {'\n'}Environment: {process.env.NODE_ENV}
            </code>

            {result.channelFound && result.channel && (
              <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
                <p className="font-medium text-gray-700">✅ Channel Verified: {result.channel.snippet.title}</p>
                <p className="text-sm text-gray-700">This is the correct ADMI channel</p>
              </div>
            )}

            {!result.channelFound && (
              <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
                <p className="font-medium text-gray-700">❌ Channel Not Found</p>
                <p className="text-sm text-gray-700">The channel ID might be incorrect</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 font-medium text-white transition"
            onClick={testYouTubeAPI}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Testing...' : 'Test Again'}
          </button>
          <a
            href="/media-archive/videos"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition"
          >
            Go to Video Gallery
          </a>
          <Link
            href="/courses/film-and-television-production-diploma"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition"
          >
            Test Course Page
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h4 className="mb-4 text-xl font-semibold text-gray-900">Troubleshooting Tips:</h4>
        <p className="mb-1 text-sm text-gray-700">• Make sure NEXT_PUBLIC_YOUTUBE_API_KEY is set in your .env file</p>
        <p className="mb-1 text-sm text-gray-700">• Verify the API key has YouTube Data API v3 enabled</p>
        <p className="mb-1 text-sm text-gray-700">• Check that the API key allows requests from localhost:3000</p>
        <p className="mb-1 text-sm text-gray-700">• Ensure the channel ID is correct for ADMI's YouTube channel</p>
      </div>
    </div>
  )
}
