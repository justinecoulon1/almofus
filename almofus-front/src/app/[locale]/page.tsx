import { DailyAlmanax } from '@/components/pages/home-page/daily-almanax/daily-almanax';
import almanaxQuestRequestProcessor from '@/utils/api/almanax-quest.request-processor';
import styles from './page.module.css';

export default async function Home() {
  const almanaxQuest = await almanaxQuestRequestProcessor.getAlmanaxQuestByDate('20250310');
  return (
    <div className={styles.pageContainer}>
      <DailyAlmanax almanaxQuest={almanaxQuest} />
    </div>
  );
}
