import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './calendar-day.module.css';

export function CalendarDay({ characters, dayIndex }: { characters: CharacterDto[]; dayIndex: number }) {
  const t = useTranslations('almanax-page');
  return (
    <div className={styles.calendarDayContainer}>
      <p>{dayIndex}</p>
    </div>
  );
}
