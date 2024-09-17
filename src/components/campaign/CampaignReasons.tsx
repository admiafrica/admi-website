import styles from '@/assets/css/main.module.css';
import Image from 'next/image';

type ReasonsProps = {
  reasons: object;
};

export default function CampaignReasons({ reasons }: ReasonsProps) {
  return (
    <div className={`${styles['reasons-to-study-grid']}`}>
      <div className={`${styles['reason-to-study__block']}`}>
        <div className={`${styles['reason-to-study__icon']}`}>
          <Image src={'https://ddasf3j8zb8ok.cloudfront.net/admi/images/entertainment.svg'} alt={''} width={115}
                 height={115} />
        </div>
        <h3 className={`${styles['reason-to-study__title']}`}>Master the Business of Entertainment</h3>
        <p>Gain a comprehensive understanding of the entertainment industry's structure, key sectors, and major
          players. This course provides you with the essential business and management skills needed to thrive in the
          fast-paced world of entertainment, particularly in emerging markets.</p>
      </div>

      <div className={`${styles['reason-to-study__block']}`}>
        <div className={`${styles['reason-to-study__icon']}`}>
          <Image src={'https://ddasf3j8zb8ok.cloudfront.net/admi/images/knowledge.svg'} alt={''} width={115}
                 height={115} />
        </div>
        <h3 className={`${styles['reason-to-study__title']}`}>Stay Ahead with Cutting-Edge Knowledge</h3>
        <p>Learn the latest trends in digital media and emerging technologies, such as online streaming, social media,
          virtual reality, and augmented reality. Equip yourself with the tools to navigate and leverage these
          advancements, ensuring you remain at the forefront of the entertainment industry.</p>
      </div>

      <div className={`${styles['reason-to-study__block']}`}>
        <div className={`${styles['reason-to-study__icon']}`}>
          <Image src={'https://ddasf3j8zb8ok.cloudfront.net/admi/images/impact.svg'} alt={''} width={115}
                 height={115} />
        </div>
        <h3 className={`${styles['reason-to-study__title']}`}>Real world Application for Immediate Impact</h3>
        <p>Apply your theoretical knowledge to real-world scenarios through case studies and practical assignments.
          This hands-on approach prepares you to tackle the unique challenges of the entertainment business, from
          talent management to audience engagement, ensuring you're industry-ready upon graduation.</p>
      </div>
    </div>
  );
}