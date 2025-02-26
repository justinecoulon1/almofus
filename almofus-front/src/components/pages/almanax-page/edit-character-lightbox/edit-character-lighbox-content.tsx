'use client';

import { useTranslations } from 'next-intl';
import styles from './edit-character-lightbox-content.module.css';
import { TertiaryGlowingInput } from '@/components/generic/inputs/input';
import { useState } from 'react';
import { useEditCharacterLightboxContext } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';
import Image from 'next/image';

export function EditCharacterLightboxContent() {
  const t = useTranslations('edit-character-lightbox');
  const { character } = useEditCharacterLightboxContext();
  const [characterName, setCharacterName] = useState(character.name);
  const pictureId = character.profilePictureId ?? 0;
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <h2>{t('edit-character')}</h2>
      <div className={styles.inputsDiv}>
        <div className={styles.characterNameInputDiv}>
          <TertiaryGlowingInput
            labelText={t('character-name-input-label')}
            inputType={'text'}
            inputName={'character-name'}
            inputValue={characterName}
            onInputValueChange={setCharacterName}
          />
        </div>
        <div className={styles.seperator}></div>
        <div className={styles.profileContainer}>
          <div className={styles.profilePictureContainer}>
            <Image
              className={styles.profilePicture}
              src={`/profile-pictures/${pictureId}.png`}
              alt={'Character profile picture'}
              width={512}
              height={512}
            />
          </div>
          <div>
            <div className={styles.colorDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
