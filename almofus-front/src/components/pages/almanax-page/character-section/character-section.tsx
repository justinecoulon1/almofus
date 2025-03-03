import { CompleteUserDto } from '@/utils/api/dto/user.dto';
import { useTranslations } from 'next-intl';
import { AddCharacterButton } from './add-character-button';
import { CharacterProfile } from './character-profile';
import styles from './character-section.module.css';

export function CharacterSection({ user }: { user: CompleteUserDto }) {
  const t = useTranslations('almanax-page');
  return (
    <div className={styles.characterSectionContainer}>
      <AddCharacterButton user={user} />
      <div className={styles.characterProfilesScrollableContainer}>
        <div className={styles.characterProfilesContainer}>
          {user.characters
            .sort((c1, c2) => c1.id - c2.id)
            .map((character, index) => (
              <CharacterProfile key={index} character={character} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
}

export function CharacterSectionDisabled() {
  return <div className={styles.characterSectionContainer}></div>;
}
