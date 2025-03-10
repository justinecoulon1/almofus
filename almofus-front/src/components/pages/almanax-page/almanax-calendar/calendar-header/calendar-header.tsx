import styles from './calendar-header.module.css';
import { SecondaryDarkButtonWithImage } from '@/components/generic/buttons/button-img';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';

export function CalendarHeader({
  currentMonth,
  setMonthDelta,
  monthDelta,
  currentDayJs,
}: {
  currentMonth: string | undefined;
  setMonthDelta: Dispatch<SetStateAction<number>>;
  monthDelta: number;
  currentDayJs: Dayjs;
}) {
  const t = useTranslations('almanax-calendar-months');
  return (
    <div className={styles.almanaxCalendarHeader}>
      <SecondaryDarkButtonWithImage
        imageSrc={'/icons/left-arrow.png'}
        imageAlt={'left arrow'}
        imageStyle={styles.buttonImg}
        onClick={() => {
          setMonthDelta(monthDelta - 1);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
          }
        }}
      />
      <div className={styles.currentMonthContainer}>
        <h2>
          {t(currentMonth)} {currentDayJs.year()}
        </h2>
      </div>
      <SecondaryDarkButtonWithImage
        imageSrc={'/icons/right-arrow.png'}
        imageAlt={'left arrow'}
        imageStyle={styles.buttonImg}
        onClick={() => {
          setMonthDelta(monthDelta + 1);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
          }
        }}
      />
    </div>
  );
}
