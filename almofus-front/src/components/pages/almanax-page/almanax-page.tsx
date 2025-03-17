'use client';

import { MustLogInSection } from '@/components/global/must-log-in/must-log-in-section';
import { useLocalStorageItem, useMounted } from '@/components/utils/env-specific/env-component.utils';
import { useTranslations } from 'next-intl';
import { AlmanaxCalendar, AlmanaxCalendarDisabled } from './almanax-calendar/almanax-calendar';
import styles from './almanax-page.module.css';
import { CharacterSection } from './character-section/character-section';
import AlmanaxList from '@/components/pages/almanax-page/almanax-list/almanax-list';
import { useState } from 'react';
import { AlmanaxDisplayType } from '@/components/pages/almanax-page/almanax-display-type';
import { CalendarHeader } from '@/components/pages/almanax-page/almanax-calendar/calendar-header/calendar-header';
import { Months } from '@/components/pages/almanax-page/almanax-page-utils/months';
import dayjs from 'dayjs';

export function AlmanaxPage() {
  const t = useTranslations('almanax-page');
  return (
    <div className={styles.almanaxPageContainer}>
      <AlmanaxCalendarSection />
    </div>
  );
}

function AlmanaxCalendarSection() {
  const user = useLocalStorageItem('user');
  const [displayType, setDisplayType] = useState(AlmanaxDisplayType.CALENDAR);
  const months = Object.entries(Months);
  const [monthDelta, setMonthDelta] = useState(0);
  const currentDayjs = dayjs().add(monthDelta, 'month');
  const currentMonth = months.find(([, value]) => value === currentDayjs.month())?.[0];
  if (useMounted()) {
    if (user) {
      return (
        <div className={styles.globalCalendarContainer}>
          <CharacterSection user={user} />
          <div className={styles.rightPartContainer}>
            <CalendarHeader
              currentMonth={currentMonth}
              setMonthDelta={setMonthDelta}
              monthDelta={monthDelta}
              currentDayJs={currentDayjs}
              displayType={displayType}
              setDisplayType={setDisplayType}
            />
            {displayType === AlmanaxDisplayType.CALENDAR && <AlmanaxCalendar currentDayjs={currentDayjs} />}
            {displayType === AlmanaxDisplayType.LIST && <AlmanaxList />}
          </div>
        </div>
      );
    }
    return <MustLogInSection />;
  }
  return <AlmanaxCalendarDisabled />;
}
