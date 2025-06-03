import styles from '@/assets/css/main.module.css'
import { IContentfulEntry } from '@/types'
import { processVideoUrl } from '@/utils'

type CampaignTestimonialsProps = {
  testimonials: IContentfulEntry[]
}
export default function CampaignTestimonials({ testimonials }: CampaignTestimonialsProps) {
  // Ensure there's at least one testimonial
  if (!testimonials.length) {
    return <p>No testimonials available.</p>
  }

  const { author, video_url, description } = testimonials[0].fields
  const processedVideoUrl = processVideoUrl(video_url)

  return (
    <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
      <div className={`${styles['video-wrapper']}`}>
        <iframe
          src={processedVideoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
          height="315"
          loading="lazy"
          title="Testimonial video"
          width="560"
        ></iframe>
      </div>

      <div className={`${styles['testimonials']}`}>
        <div className={`${styles['article']}`} dangerouslySetInnerHTML={{ __html: description }} />
        <span className={`${styles['text-600']} ${styles['d-block']} ${styles['mt-6']}`}>{author}</span>
      </div>
    </div>
  )
}
