import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import { CharacterProfile } from './character-profile';
import styles from './character-section.module.css';

export function CharacterSection(parameters: { characters: CharacterDto[] }) {
  const t = useTranslations('almanax-page');
  return (
    <div className={styles.characterSectionContainer}>
      {parameters.characters.map((character, index) => (
        <CharacterProfile key={index} />
      ))}
    </div>
  );
}

export function CharacterSectionDisabled() {
  return (
    <div className={styles.characterSectionContainer}>
      <CharacterProfile disabled={true} />
      <CharacterProfile disabled={true} />
      <CharacterProfile disabled={true} />
    </div>
  );
}
