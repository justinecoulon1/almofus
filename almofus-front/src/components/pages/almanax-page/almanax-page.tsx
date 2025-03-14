'use client';

import { MustLogInSection } from '@/components/global/must-log-in/must-log-in-section';
import { useLocalStorageItem, useMounted } from '@/components/utils/env-specific/env-component.utils';
import { useTranslations } from 'next-intl';
import { AlmanaxCalendar, AlmanaxCalendarDisabled } from './almanax-calendar/almanax-calendar';
import styles from './almanax-page.module.css';
import { CharacterSection } from './character-section/character-section';

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
  if (useMounted()) {
    if (user) {
      return (
        <div className={styles.globalCalendarContainer}>
          <CharacterSection user={user} />
          <AlmanaxCalendar user={user} />
        </div>
      );
    }
    return <MustLogInSection />;
  }
  return <AlmanaxCalendarDisabled />;
}
