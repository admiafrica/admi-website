import { S3Client } from '@aws-sdk/client-s3'

// AWS S3 Configuration
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
})

export const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'admi-media-archive-381492234121',
  REGION: process.env.AWS_REGION || 'us-east-1',
  MEDIA_ARCHIVE_PREFIX: 'media-archive/' // S3 prefix for media archive folders
}

export const CLOUDFRONT_CONFIG = {
  DOMAIN: process.env.CLOUDFRONT_DOMAIN || 'd17qqznw1g499t.cloudfront.net',
  DISTRIBUTION_ID: process.env.CLOUDFRONT_DISTRIBUTION_ID || 'E393T67BBOZDBU'
}
