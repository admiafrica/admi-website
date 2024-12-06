import styles from '@/assets/css/main.module.css';
import { IContentfulEntry } from '@/types';

type FaqsProps = {
  faqs: IContentfulEntry[];
};

export default function CampaignFaqs({ faqs }: FaqsProps) {
  return (
    <div className={`${styles['accordion']}`}>
      {faqs.map((faq, index) => (
        <details key={index} open={index === 0}>
          <summary>
            <h3 className={`${styles['details__title']}`}>{faq.fields.title as string}</h3>
          </summary>
          <div className={`${styles['details__content']} ${styles['article']}`} dangerouslySetInnerHTML={{ __html: faq.fields.description as string }} />
        </details>
      ))}
    </div>
  );
}