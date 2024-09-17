import styles from '@/assets/css/main.module.css';

type Faq = {
  title: string;
  description: string;
}

type FaqsProps = {
  faqs: Faq[];
};

export default function CampaignFaqs({ faqs }: FaqsProps) {
  return (
    <div className={`${styles['accordion']}`}>
      {faqs.map((faq, index) => (
        <details key={index} open={index === 0}>
          <summary>
            <h3 className={`${styles['details__title']}`}>{faq.title}</h3>
          </summary>
          <div className={`${styles['details__content']} ${styles['article']}`}>
            {faq.description}
          </div>
        </details>
      ))}
    </div>
  );
}