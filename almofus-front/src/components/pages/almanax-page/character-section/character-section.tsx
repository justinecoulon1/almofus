import { CompleteUserDto } from '@/utils/api/dto/user.dto';
import { useTranslations } from 'next-intl';
import { AddCharacterButton } from './add-character-button';
import { CharacterProfile } from './character-profile';
import styles from './character-section.module.css';
import { EditCharacterLightbox } from '../edit-character-lightbox/edit-character-lightbox';
import { useState } from 'react';

export function CharacterSection({ user }: { user: CompleteUserDto }) {
  const t = useTranslations('almanax-page');
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  return (
    <div className={styles.characterSectionContainer}>
      <EditCharacterLightbox isLightboxOpened={isLightboxOpened} setLightboxOpened={setLightboxOpened} />
      <AddCharacterButton user={user} />
      <div className={styles.characterProfilesScrollableContainer}>
        <div className={styles.characterProfilesContainer}>
          {user.characters.map((character, index) => (
            <CharacterProfile key={index} character={character} setLightboxOpened={setLightboxOpened} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CharacterSectionDisabled() {
  return (
    <div className={styles.characterSectionContainer}>
    </div>
  );
}
