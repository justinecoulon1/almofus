import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './almanax-calendar.module.css';
import dayjs from 'dayjs';
import { DaysOfWeek, generateCalendar, Months } from './calendar-utils/calendar';
import { CalendarDay } from './calendar-day/calendar-day';
import { SecondaryButtonWithImage } from '@/components/generic/buttons/button-img';
import { useState } from 'react';

export function AlmanaxCalendar(parameters: { characters: CharacterDto[] }) {
  const t = useTranslations('almanax-page');
  const days = Object.keys(DaysOfWeek);
  const months = Object.entries(Months);
  const [monthDelta, setMonthDelta] = useState(0);

  const currentDayJs = dayjs().add(monthDelta, 'month');
  const calendar = generateCalendar(currentDayJs);
  const currentMonth = months.find(([, value]) => value === currentDayJs.month())?.[0];
  return (
    <div className={styles.almanaxCalendarContainer}>
      <div className={styles.almanaxCalendarHeader}>
        <SecondaryButtonWithImage
          imageSrc={'/icons/left-arrow.png'}
          imageAlt={'left arrow'}
          imageStyle={styles.buttonImg}
          onClick={() => { setMonthDelta(monthDelta - 1); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            }
          }}
        />
        <h2>
          {currentMonth} {currentDayJs.year()}
        </h2>
        <SecondaryButtonWithImage
          imageSrc={'/icons/right-arrow.png'}
          imageAlt={'left arrow'}
          imageStyle={styles.buttonImg}
          onClick={() => { setMonthDelta(monthDelta + 1); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            }
          }}
        />
      </div>
      <div className={styles.almanaxCalendarGridContainer}>
        {days.map((day, i) => (
          <div key={`day_${i}`} className={styles.gridHeader}>
            {day}
          </div>
        ))}
        {calendar.map((d, index) => {
          if (d !== 0) {
            return <CalendarDay key={index} characters={parameters.characters} dayIndex={d} />;
          } else {
            return <CalendarDay key={index} characters={parameters.characters} dayIndex={d} />;
          }
        })}
      </div>
    </div>
  );
}

export function AlmanaxCalendarDisabled() {
  return <div></div>;
}
