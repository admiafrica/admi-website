import { S3Client } from '@aws-sdk/client-s3'

// AWS S3 Configuration - Use default credential chain in Amplify serverless environment
export const s3Client = new S3Client({
  region: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1'
  // Let AWS SDK use default credential chain (IAM roles for Amplify)
  // In Amplify serverless functions, this should automatically use the service role
})

export const S3_CONFIG = {
  BUCKET_NAME: process.env.S3_BUCKET_NAME || process.env.S3_ARCHIVE_BUCKET || 'admi-media-archive-381492234121',
  REGION: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1',
  MEDIA_ARCHIVE_PREFIX: 'media-archive/' // S3 prefix for media archive folders
}

// Debug S3 configuration
console.log('🔧 S3 Config Debug:', {
  hasS3BucketName: !!(process.env.S3_BUCKET_NAME || process.env.S3_ARCHIVE_BUCKET),
  bucketFromEnv: process.env.S3_BUCKET_NAME || process.env.S3_ARCHIVE_BUCKET,
  finalBucketName: S3_CONFIG.BUCKET_NAME,
  hasS3Region: !!(process.env.S3_REGION || process.env.AWS_REGION),
  regionFromEnv: process.env.S3_REGION || process.env.AWS_REGION,
  finalRegion: S3_CONFIG.REGION,
  hasAwsCredentials: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
})

export const CLOUDFRONT_CONFIG = {
  DOMAIN: process.env.CLOUDFRONT_DOMAIN || 'd17qqznw1g499t.cloudfront.net',
  DISTRIBUTION_ID: process.env.CLOUDFRONT_DISTRIBUTION_ID || 'E393T67BBOZDBU'
}
