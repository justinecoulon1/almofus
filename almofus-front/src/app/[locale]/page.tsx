import { DailyAlmanax } from '@/components/daily-almanax/daily-almanax';
import styles from './page.module.css';
import almanaxQuestRequestProcessor from '@/utils/api/almanax-quest.request-processor';

export default async function Home() {
  const almanaxQuest = await almanaxQuestRequestProcessor.getAlmanaxQuestByDate('16/02', 2025);
  return (
    <div className={styles.pageContainer}>
      <DailyAlmanax almanaxQuest={almanaxQuest} />
    </div>
  );
}
