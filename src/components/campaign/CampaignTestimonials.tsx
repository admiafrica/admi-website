import styles from '@/assets/css/main.module.css';

export default function CampaignTestimonials({ testimonial }) {
  const { author, description, video_url} = testimonial

  return (
    <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
      <div className={`${styles['video-wrapper']}`}>
        <iframe
          src={video_url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen="allowfullscreen" frameBorder="0" height="315" loading="lazy" title={author}
          width="560">
        </iframe>
      </div>

      <div className={`${styles['article']}`}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <span className={`${styles['text-600']}`}>{author}</span>
      </div>
    </div>
  );
}