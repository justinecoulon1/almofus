import { useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';
import dayjs from 'dayjs';
import { DaysOfWeek, generateCalendar, Months } from './calendar-utils/calendar';
import { CalendarDay } from './calendar-day/calendar-day';
import { useState } from 'react';
import { CalendarHeader } from './calendar-header/calendar-header';
import { CompleteUserDto } from '@/utils/api/dto/user.dto';

export function AlmanaxCalendar({ user }: { user: CompleteUserDto }) {
  const t = useTranslations('almanax-calendar-days');
  const days = Object.keys(DaysOfWeek);
  const months = Object.entries(Months);
  const [monthDelta, setMonthDelta] = useState(0);

  const currentDayJs = dayjs().add(monthDelta, 'month');
  const calendar = generateCalendar(currentDayJs);
  const currentMonth = months.find(([, value]) => value === currentDayJs.month())?.[0];
  return (
    <div className={styles.almanaxCalendarContainer}>
      <CalendarHeader
        currentMonth={currentMonth}
        setMonthDelta={setMonthDelta}
        monthDelta={monthDelta}
        currentDayJs={currentDayJs}
      />
      <div className={styles.almanaxCalendarGridContainer}>
        {days.map((day, i) => (
          <div key={`day_${i}`} className={styles.gridHeader}>
            {t(day)}
          </div>
        ))}
        {calendar.map((d, index) => {
          if (d !== 0) {
            return <CalendarDay key={index} characters={user.characters} dayIndex={d} />;
          } else {
            return <CalendarDay key={index} characters={user.characters} dayIndex={d} />;
          }
        })}
      </div>
    </div>
  );
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
