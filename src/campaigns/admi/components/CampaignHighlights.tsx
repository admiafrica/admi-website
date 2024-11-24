import styles from '@/assets/css/main.module.css';
import feeIcon from '@/assets/images/fee.svg';
import hoursIcon from '@/assets/images/hours.svg';
import Image from 'next/image';

type HighlightsProps = {
  fee: string;
  hours: string;
  prospectus: string;
};

export default function CampaignHighlights({ fee, hours, prospectus }: HighlightsProps) {
  return (
    <div className={`${styles['highlights-grid']}`}>
      <div className={`${styles['highlight__block']}`}>
        <h3 className={`${styles['section-title']} ${styles['highlight__block--title']} ${styles['mb-0']}`}>KES {fee}</h3>
        <div className={`${styles['highlight-label']}`}>
          <Image src={feeIcon.src} alt={''} width={50} height={50} />
          <span className={`${styles['section-subtitle']} ${styles['mb-0']}`}>Tuition Fee</span>
        </div>
      </div>

      <div className={`${styles['highlight__block']}`}>
        <h3 className={`${styles['section-title']} ${styles['highlight__block--title']} ${styles['mb-0']}`}>{hours}</h3>
        <div className={`${styles['highlight-label']}`}>
          <Image src={hoursIcon.src} alt={''} width={50} height={50} />
          <span className={`${styles['section-subtitle']} ${styles['mb-0']}`}>Credit Hours</span>
        </div>
      </div>
      {prospectus && (
          <div className={`${styles['highlight__block']} ${styles['highlight__block--has-link']}`}>
            <h3 className={`${styles['section-title']} ${styles['highlight__block--title']} ${styles['mb-0']}`}>
              {prospectus}
            </h3>
            <div className={`${styles['highlight-label']}`}>
              <Image src={hoursIcon.src} alt={''} width={50} height={50} />
              <span className={`${styles['section-subtitle']} ${styles['mb-0']}`}>Duration</span>
            </div>
          </div>
      )}
    </div>
  );
}
