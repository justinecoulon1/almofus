import { useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';
import dayjs, { Dayjs } from 'dayjs';
import {
  CalendarDateInfo,
  DaysOfWeek,
  generateCalendar,
  getMonthStartAndEndDate,
  Months,
} from './calendar-utils/calendar';
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
  const previousDayJs = currentDayJs.add(-1, 'month');
  const nextDayJs = currentDayJs.add(1, 'month');
  const calendar: CalendarDateInfo[] = generateCalendar(currentDayJs);
  const currentMonth = months.find(([, value]) => value === currentDayJs.month())?.[0];
  const getQuests = async (dayJs: Dayjs) => {
    const { startDate, endDate } = getMonthStartAndEndDate(dayJs);
    return await almanaxQuestRequestProcessor.getAlmanaxQuestByDateRange(startDate, endDate);
  };
  const { data: currentMonthQuests } = useQuery({
    queryKey: ['currentQuests', currentDayJs.month()],
    queryFn: () => getQuests(currentDayJs),
  });
  const { data: previousMonthQuests } = useQuery({
    queryKey: ['previousQuests', previousDayJs.month()],
    queryFn: () => getQuests(previousDayJs),
  });
  const { data: nextMonthQuests } = useQuery({
    queryKey: ['nextQuests', nextDayJs.month()],
    queryFn: () => getQuests(nextDayJs),
  });
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
        {calendar.map((calendarDateInfo, index) => {
          if (calendarDateInfo.monthIndex === currentDayJs.month() - 1) {
            return (
              <CalendarDay
                key={index}
                characters={user.characters}
                quest={previousMonthQuests?.[calendarDateInfo.dayIndex - 1]}
                dayIndex={calendarDateInfo.dayIndex}
              />
            );
          } else if (calendarDateInfo.monthIndex === currentDayJs.month()) {
            return (
              <CalendarDay
                key={index}
                characters={user.characters}
                quest={currentMonthQuests?.[calendarDateInfo.dayIndex - 1]}
                dayIndex={calendarDateInfo.dayIndex}
              />
            );
          } else if (calendarDateInfo.monthIndex === currentDayJs.month() + 1) {
            return (
              <CalendarDay
                key={index}
                characters={user.characters}
                quest={nextMonthQuests?.[calendarDateInfo.dayIndex - 1]}
                dayIndex={calendarDateInfo.dayIndex}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
