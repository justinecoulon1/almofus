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
  const [isOpen, setOpen] = useState(false);
  const pictureId = character.profilePictureId ?? 0;
  const images =['/profile-pictures/0.png', '/profile-pictures/1.png'];
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
          <button className={styles.profilePictureContainer} onClick={() => setOpen((prev) => !prev)}>
              <Image
                className={styles.profilePicture}
                src={`/profile-pictures/${pictureId}.png`}
                alt={'Character profile picture'}
                width={512}
                height={512}
              />
          </button>
          {isOpen && <div className={styles.dropDown}>
            <ul>
              {images.map((image, index) =>
                  <div key={index}>
                    <button className={styles.profilePictureContainer} onClick={() => {}}>
                      <Image
                          className={styles.profilePicture}
                          src={image}
                          alt={'Character profile picture'}
                          width={512}
                          height={512}
                      />
                    </button>
                  </div>)}
            </ul>
          </div>}
          <div>
            <div className={styles.colorDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
