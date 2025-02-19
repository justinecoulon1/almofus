import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';

export function AlmanaxCalendar(parameters: { characters: CharacterDto[] }) {
  const t = useTranslations('almanax-page');
  return <div className={styles.almanaxCalendarContainer}></div>;
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
