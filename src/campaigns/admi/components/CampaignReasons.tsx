import styles from '@/assets/css/main.module.css';
import Image from 'next/image';

type Reasons = {
  image: string;
  title: string;
  description: string;
}

type ReasonsProps = {
  reasons: Reasons[];
};

export default function CampaignReasons({ reasons }: ReasonsProps) {
  return (
    <div className={`${styles['reasons-to-study-grid']}`}>
      {reasons.map((reason, index) => (
        <div key={index} className={`${styles['reason-to-study__block']}`}>
          <div className={`${styles['reason-to-study__icon']}`}>
            <Image src={reason.image} alt={''} width={115} height={115} />
          </div>
          <h3 className={`${styles['reason-to-study__title']}`}>{reason.title}</h3>
          <p>{reason.description}</p>
        </div>
      ))}
    </div>
  );
}