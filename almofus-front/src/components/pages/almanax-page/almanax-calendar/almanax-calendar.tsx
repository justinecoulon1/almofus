import { useLocale, useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';
import { CalendarDateInfo, generateCalendar } from './calendar-utils/calendar';
import { AlmanaxCalendarDay } from './calendar-day/almanax-calendar-day';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import { Locales } from '@/i18n/routing';
import { useQuestsQuery } from '@/components/pages/almanax-page/almanax-page-utils/quests-query';
import { DaysOfWeek } from '@/components/pages/almanax-page/almanax-page-utils/days-of-week';
import { Dayjs } from 'dayjs';
import classNames from 'classnames';

export function AlmanaxCalendar({ currentDayjs }: { currentDayjs: Dayjs }) {
  const t = useTranslations('almanax-calendar-days');
  const locale = useLocale() as Locales;
  const days = Object.keys(DaysOfWeek);

  const previousDayJs = currentDayjs.add(-1, 'month');
  const nextDayJs = currentDayjs.add(1, 'month');
  const calendar: CalendarDateInfo[] = generateCalendar(currentDayjs);

  const { data: currentMonthQuests } = useQuestsQuery(currentDayjs);
  const { data: previousMonthQuests } = useQuestsQuery(previousDayJs);
  const { data: nextMonthQuests } = useQuestsQuery(nextDayJs);
  useQuestsQuery(nextDayJs.add(1, 'month'));
  useQuestsQuery(previousDayJs.add(-1, 'month'));
  return (
    <div className={styles.almanaxCalendarContainer}>
      <div className={styles.gridContainer}>
        {days.map((day, i) => (
          <div key={`day_${i}`} className={styles.daysHeader}>
            <p>{t(day)} </p>
          </div>
        ))}
      </div>
      <div className={classNames(styles.scrollableCalendarContainer, styles.gridContainer)}>
        {calendar.map((calendarDateInfo, index) => {
          let quests: AlmanaxQuestDto[] | undefined = undefined;
          let isDisabled = false;
          if (calendarDateInfo.monthIndex === previousDayJs.month()) {
            quests = previousMonthQuests;
            isDisabled = true;
          } else if (calendarDateInfo.monthIndex === currentDayjs.month()) {
            quests = currentMonthQuests;
          } else if (calendarDateInfo.monthIndex === nextDayJs.month()) {
            quests = nextMonthQuests;
            isDisabled = true;
          }
          const quest = quests?.[calendarDateInfo.dayIndex - 1];
          return (
            <AlmanaxCalendarDay
              key={index}
              quest={quest}
              dayIndex={calendarDateInfo.dayIndex}
              isDisabled={isDisabled}
              locale={locale}
            />
          );
        })}
      </div>
    </div>
  );
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
