import styles from '@/assets/css/main.module.css'
import Image, { StaticImageData } from 'next/image'

type ImageProps = {
  src: string | StaticImageData
  alt: string
  status: number
}

export default function CampaignBanner({ src, alt, status }: ImageProps) {
  return (
    <section
      className={`${styles['section-wrapper']} ${styles['course-banner']} ${status === 1 ? '' : styles['full-height-banner']}`}
    >
      <div className={`${styles['course-banner__pic']}`}>
        <Image
          src={typeof src === 'string' ? src : alt}
          alt={alt}
          width={1920}
          height={600}
          className={`${styles['course-banner__pic-bg-pic']}`}
          priority={true}
        />
        <a href="#course" className={`${styles['course-banner__link']}`}></a>
      </div>
    </section>
  )
}
