'use client';

import { useTranslations } from 'next-intl';
import { MustLogInSection } from '../global/must-log-in/must-log-in-section';
import { useLocalStorageItem, useMounted } from '../utils/env-specific/env-component.utils';
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
        <>
          <CharacterSection characters={user.characters} />
          <AlmanaxCalendar characters={user.characters} />
        </>
      );
    }
    return <MustLogInSection />;
  }
  return <AlmanaxCalendarDisabled />;
}
