import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './calendar-day.module.css';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';

export function CalendarDay({
  characters,
  dayIndex,
  quest,
}: {
  characters: CharacterDto[];
  dayIndex: number;
  quest: AlmanaxQuestDto | undefined;
}) {
  const t = useTranslations('almanax-page');
  return (
    <div className={styles.calendarDayContainer}>
      <div className={styles.cardHeader}>
        <p>{dayIndex}</p>
      </div>
      <div className={styles.itemContainer}>
        <p>{quest?.item.nameLabel.fr}</p>
      </div>
    </div>
  );
}
