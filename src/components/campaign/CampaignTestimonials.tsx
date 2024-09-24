import styles from '@/assets/css/main.module.css';
interface Testimonial {
    author: string;
    video_url: string;
    description: string;
}
type CampaignTestimonialsProps = {
    testimonials: Testimonial[];
};
export default function CampaignTestimonials({ testimonials }: CampaignTestimonialsProps) {
    // Ensure there's at least one testimonial
    if (!testimonials.length) {
        return <p>No testimonials available.</p>;
    }

    const { author, video_url, description } = testimonials[0];

    return (
        <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
            <div className={`${styles['video-wrapper']}`}>
                <iframe
                    src={video_url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                    frameBorder="0"
                    height="315"
                    loading="lazy"
                    title="Testimonial video"
                    width="560"
                ></iframe>
            </div>

            <div className={`${styles['testimonials']}`}>
                <div
                    className={`${styles['article']}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
                <span className={`${styles['text-600']} ${styles['d-block']} ${styles['mt-6']}`}>{author}</span>
            </div>
        </div>
    );
}
