import { useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarDateInfo, DaysOfWeek, generateCalendar, Months } from './calendar-utils/calendar';
import { CalendarDay } from './calendar-day/calendar-day';
import { useState } from 'react';
import { CalendarHeader } from './calendar-header/calendar-header';
import { CompleteUserDto } from '@/utils/api/dto/user.dto';
import almanaxQuestRequestProcessor from '@/utils/api/almanax-quest.request-processor';
import { useQuery } from '@tanstack/react-query';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';

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

  const { data: currentMonthQuests } = useQuestsQuery(currentDayJs);
  const { data: previousMonthQuests } = useQuestsQuery(previousDayJs);
  const { data: nextMonthQuests } = useQuestsQuery(nextDayJs);
  useQuestsQuery(nextDayJs.add(1, 'month'));
  useQuestsQuery(previousDayJs.add(-1, 'month'));
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
          let quests: AlmanaxQuestDto[] | undefined = undefined;
          let isDisabled = false;
          if (calendarDateInfo.monthIndex === previousDayJs.month()) {
            quests = previousMonthQuests;
            isDisabled = true;
          } else if (calendarDateInfo.monthIndex === currentDayJs.month()) {
            quests = currentMonthQuests;
          } else if (calendarDateInfo.monthIndex === nextDayJs.month()) {
            quests = nextMonthQuests;
            isDisabled = true;
          }
          const quest = quests?.[calendarDateInfo.dayIndex - 1];
          return (
            <CalendarDay
              key={index}
              characters={user.characters}
              quest={quest}
              dayIndex={calendarDateInfo.dayIndex}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
}

function useQuestsQuery(dayJs: Dayjs) {
  return useQuery({
    queryKey: ['almanaxCalendarQuests', dayJs.month(), dayJs.year()],
    staleTime: 1000 * 60 * 5,
    queryFn: () => {
      const { startDate, endDate } = getMonthStartAndEndDate(dayJs);
      return almanaxQuestRequestProcessor.getAlmanaxQuestByDateRange(startDate, endDate);
    },
  });
}

function getMonthStartAndEndDate(dayJs: Dayjs) {
  const year = dayJs.year();
  const month = (dayJs.month() + 1).toString().padStart(2, '0');
  const daysInMonth = dayJs.daysInMonth();

  const startDate = `${year}${month}01`;
  const endDate = `${year}${month}${daysInMonth}`;

  return { startDate, endDate };
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
