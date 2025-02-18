'use client';

import { useTranslations } from 'next-intl';
import { MustLogInSection } from '../global/must-log-in/must-log-in-section';
import { useLocalStorageItem, useMounted } from '../utils/env-specific/env-component.utils';
import styles from './almanax-page.module.css';
import { CharacterSection, CharacterSectionDisabled } from './character-section';

export function AlmanaxPage() {
  const t = useTranslations('almanax-page');
  return (
    <div className={styles.almanaxPageContainer}>
      <UserCharacterSection />
    </div>
  );
}

function UserCharacterSection() {
  const user = useLocalStorageItem('user');
  if (useMounted()) {
    if (user) {
      return <CharacterSection characters={user.characters} />;
    }
    return <MustLogInSection />;
  }
  return <CharacterSectionDisabled />;
}
