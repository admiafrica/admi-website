import { CSSProperties, ReactNode } from 'react'

interface LoadingSkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
  children?: ReactNode
  animate?: boolean
}

export default function LoadingSkeleton({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className = '',
  children,
  animate = true
}: LoadingSkeletonProps) {
  const skeletonStyle: CSSProperties = {
    width,
    height,
    borderRadius,
    background: animate ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' : '#f0f0f0',
    backgroundSize: animate ? '200% 100%' : 'auto',
    animation: animate ? 'shimmer 1.5s infinite ease-in-out' : 'none',
    display: 'block'
  }

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      <div className={`loading-skeleton ${className}`} style={skeletonStyle} aria-hidden="true" role="presentation">
        {children}
      </div>
    </>
  )
}

// Pre-built skeleton components for common use cases
export function ImageSkeleton({
  width = '100%',
  height = '200px',
  className = '',
  aspectRatio
}: LoadingSkeletonProps & { aspectRatio?: string }) {
  const style: CSSProperties = aspectRatio ? { width, aspectRatio, height: 'auto' } : { width, height }

  return (
    <LoadingSkeleton
      width={style.width}
      height={style.height}
      borderRadius="8px"
      className={`image-skeleton ${className}`}
    />
  )
}

export function TextSkeleton({ lines = 1, className = '', width = '100%' }: LoadingSkeletonProps & { lines?: number }) {
  if (lines === 1) {
    return <LoadingSkeleton width={width} height="1rem" className={className} />
  }

  return (
    <div className={`text-skeleton ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <LoadingSkeleton
          key={i}
          width={i === lines - 1 ? '75%' : '100%'}
          height="1rem"
          className={i < lines - 1 ? 'mb-2' : ''}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({
  className = '',
  hasImage = true,
  hasTitle = true,
  hasDescription = true
}: {
  className?: string
  hasImage?: boolean
  hasTitle?: boolean
  hasDescription?: boolean
}) {
  return (
    <div className={`card-skeleton rounded-lg border border-gray-200 p-4 ${className}`}>
      {hasImage && <ImageSkeleton height="200px" className="mb-4" />}
      {hasTitle && <TextSkeleton width="80%" className="mb-2" />}
      {hasDescription && <TextSkeleton lines={3} className="mb-4" />}
      <LoadingSkeleton width="120px" height="40px" borderRadius="20px" />
    </div>
  )
}
