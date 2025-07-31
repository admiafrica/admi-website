import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    // Read the albums manifest to find the requested album
    const filePath = join(process.cwd(), 'public', 'api', 'media-archive', 'albums.json')
    const fileContent = readFileSync(filePath, 'utf8')
    const albumsData = JSON.parse(fileContent)

    if (!albumsData.success || !albumsData.albums) {
      throw new Error('Invalid albums data')
    }

    // Find the album by slug
    const album = albumsData.albums.find((a: any) => a.slug === params.slug)

    if (!album) {
      return NextResponse.json(
        {
          success: false,
          error: 'Album not found',
          album: null
        },
        { status: 404 }
      )
    }

    // For now, return the album with mock images since we don't have individual image listings
    // In a real implementation, this would fetch individual images from S3
    const albumWithImages = {
      ...album,
      images: [
        {
          id: `${album.id}-img-1`,
          title: `${album.title} - Image 1`,
          filename: album.thumbnail.split('/').pop() || 'image.jpg',
          thumbnail: album.thumbnail,
          fullSize: album.thumbnail,
          downloadUrl: album.thumbnail,
          size: 500000, // Mock size
          lastModified: new Date().toISOString()
        }
      ]
    }

    return NextResponse.json(
      {
        success: true,
        album: albumWithImages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      }
    )
  } catch (error) {
    console.error('Error serving album:', error)

    // Fallback response
    return NextResponse.json(
      {
        success: false,
        error: 'Album not found or server error',
        album: null
      },
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300'
        }
      }
    )
  }
}
