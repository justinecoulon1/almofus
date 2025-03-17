import styles from './calendar-header.module.css';
import { PrimaryButtonWithImageBorderless } from '@/components/generic/buttons/button-img';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { AlmanaxDisplayType } from '@/components/pages/almanax-page/almanax-display-type';
import classNames from 'classnames';

export function CalendarHeader({
  currentMonth,
  setMonthDelta,
  monthDelta,
  currentDayJs,
  displayType,
  setDisplayType,
}: {
  currentMonth: string | undefined;
  setMonthDelta: Dispatch<SetStateAction<number>>;
  monthDelta: number;
  currentDayJs: Dayjs;
  displayType: AlmanaxDisplayType;
  setDisplayType: Dispatch<SetStateAction<AlmanaxDisplayType>>;
}) {
  const t = useTranslations('almanax-calendar-months');
  return (
    <div className={styles.almanaxCalendarHeader}>
      <ChangeMonthButtons setMonthDelta={setMonthDelta} monthDelta={monthDelta} />

      <div className={styles.currentMonthContainer}>
        <h2>
          {t(currentMonth)} {currentDayJs.year()}
        </h2>
      </div>

      <div className={styles.displayTypeButtonsDiv}>
        <PrimaryButtonWithImageBorderless
          imageSrc={'/icons/calendar.png'}
          imageAlt={'left arrow'}
          imageStyle={styles.buttonImg}
          className={classNames(displayType === AlmanaxDisplayType.CALENDAR && styles.selected)}
          onClick={() => {
            setDisplayType(AlmanaxDisplayType.CALENDAR);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setDisplayType(AlmanaxDisplayType.CALENDAR);
            }
          }}
        />
        <PrimaryButtonWithImageBorderless
          imageSrc={'/icons/checklist.png'}
          imageAlt={'left arrow'}
          className={classNames(displayType === AlmanaxDisplayType.LIST && styles.selected)}
          imageStyle={styles.buttonImg}
          onClick={() => {
            setDisplayType(AlmanaxDisplayType.LIST);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setDisplayType(AlmanaxDisplayType.LIST);
            }
          }}
        />
      </div>
    </div>
  );
}

function ChangeMonthButtons({
  setMonthDelta,
  monthDelta,
}: {
  setMonthDelta: Dispatch<SetStateAction<number>>;
  monthDelta: number;
}) {
  return (
    <div className={styles.changeMonthButtonsDiv}>
      <PrimaryButtonWithImageBorderless
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
      <PrimaryButtonWithImageBorderless
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
