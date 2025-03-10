import { useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';
import dayjs from 'dayjs';
import { DaysOfWeek, generateCalendar, Months } from './calendar-utils/calendar';
import { CalendarDay } from './calendar-day/calendar-day';
import { useState } from 'react';
import { CalendarHeader } from './calendar-header/calendar-header';
import { CompleteUserDto } from '@/utils/api/dto/user.dto';
import almanaxQuestRequestProcessor from '@/utils/api/almanax-quest.request-processor';
import { useQuery } from '@tanstack/react-query';

export function AlmanaxCalendar({ user }: { user: CompleteUserDto }) {
  const t = useTranslations('almanax-calendar-days');
  const days = Object.keys(DaysOfWeek);
  const months = Object.entries(Months);
  const [monthDelta, setMonthDelta] = useState(0);

  const currentDayJs = dayjs().add(monthDelta, 'month');
  const calendar = generateCalendar(currentDayJs);
  const currentMonth = months.find(([, value]) => value === currentDayJs.month())?.[0];
  const month = currentDayJs.month() + 1;
  const year = currentDayJs.year();
  const daysInMonth = currentDayJs.daysInMonth();
  const startDate = year.toString().concat(month.toString().padStart(2, '0'), '01');
  const endDate = year.toString().concat(month.toString().padStart(2, '0'), daysInMonth.toString());
  const getQuests = async () => {
    return await almanaxQuestRequestProcessor.getAlmanaxQuestByDateRange(startDate, endDate);
  };
  const { data } = useQuery({ queryKey: ['quests'], queryFn: getQuests });
  console.log(data);
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
            <p>{t(day)} </p>
          </div>
        ))}
        {calendar.map((d, index) => {
          if (d !== 0) {
            return <CalendarDay key={index} characters={user.characters} quest={data?.[d - 1]} dayIndex={d} />;
          } else {
            return <CalendarDay key={index} characters={user.characters} quest={undefined} dayIndex={d} />;
          }
        })}
      </div>
    </div>
  );
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
