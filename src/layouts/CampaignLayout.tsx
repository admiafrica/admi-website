import styles from '@/assets/css/main.module.css';
import { CampaignHeader } from '../components/campaign';

type LayoutProps = {
  children: React.ReactNode;
};

export function CampaignLayout({ children }: LayoutProps) {
  return (
    <>
      <CampaignHeader />
      <main className={styles['campaign-main']}>
        {children}
      </main>
    </>
  );
}