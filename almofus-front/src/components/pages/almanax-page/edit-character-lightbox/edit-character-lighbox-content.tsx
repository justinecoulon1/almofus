'use client';

import { useTranslations } from 'next-intl';
import styles from './edit-character-lightbox-content.module.css';
import { CharacterDto } from '@/utils/api/dto/character.dto';
import { TertiaryGlowingInput } from '@/components/generic/inputs/input';
import { useState } from 'react';

export function EditCharacterLightboxContent({ character }: { character: CharacterDto }) {
  const t = useTranslations('edit-character-lightbox');
  const [characterName, setCharacterName] = useState(character.name);
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <h2>{t('edit-character')}</h2>
      <div className={styles.inputsDiv}>
        <TertiaryGlowingInput
          labelText={t('character-name-input-label')}
          inputType={'text'}
          inputName={'character-name'}
          inputValue={characterName}
          onInputValueChange={setCharacterName}
        />
      </div>
    </div>
  );
}
