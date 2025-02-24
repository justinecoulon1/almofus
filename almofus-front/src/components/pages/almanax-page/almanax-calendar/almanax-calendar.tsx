import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';
import dayjs from 'dayjs';
import { DaysOfWeek, generateCalendar } from './calendar-utils/calendar';
import { CalendarDay } from './calendar-day/calendar-day';

export function AlmanaxCalendar(parameters: { characters: CharacterDto[] }) {
  const t = useTranslations('almanax-page');
  const d = new Date();
  const calendar = generateCalendar(dayjs(d));
  const days = Object.keys(DaysOfWeek);
  return (
    <div className={styles.almanaxCalendarContainer}>
      {days.map((day, i) => (
        <div key={`day_${i}`} className={styles.gridHeader}>
          {day}
        </div>
      ))}
      {calendar.map((c) =>
        c.map((d, index) => {
          if (d !== null) {
            return <CalendarDay key={index} characters={parameters.characters} dayindex={d} />;
          } else {
            return <CalendarDay key={index} characters={parameters.characters} dayindex={d} />;
          }
        }),
      )}
    </div>
  );
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
