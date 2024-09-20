import styles from '@/assets/css/main.module.css';
import { Carousel } from '@mantine/carousel';

export default function CampaignTestimonials({ testimonials }) {
  const { video_url } = testimonials[0];

  return (
    <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
      <div className={`${styles['video-wrapper']}`}>
        <iframe
          src={video_url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen="allowfullscreen" frameBorder="0" height="315" loading="lazy" title="Testimonial video"
          width="560">
        </iframe>
      </div>

      <div className={`${styles['testimonials']}`}>
        <Carousel slideSize="70%" align="start" withControls={false} withIndicators slideGap="md">
          {testimonials.map((testimonial, index) => (
            <Carousel.Slide key={index}>
              <div className={`${styles['article']}`} dangerouslySetInnerHTML={{ __html: testimonial.description }} />
              <span className={`${styles['text-600']} ${styles['d-block']} ${styles['mt-6']}`}>
                {testimonial.author}
              </span>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}