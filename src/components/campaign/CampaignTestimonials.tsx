import styles from '@/assets/css/main.module.css';

type TestimonialsProps = {
  video: string;
  description: string;
  author: string;
};

export default function CampaignTestimonials({ video, description, author }: TestimonialsProps) {
  return (
    <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
      <div className={`${styles['video-wrapper']}`}>
        <iframe
          src={video}
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