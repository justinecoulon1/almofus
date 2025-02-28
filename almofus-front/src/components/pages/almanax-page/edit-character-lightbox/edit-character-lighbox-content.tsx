'use client';

import { useTranslations } from 'next-intl';
import styles from './edit-character-lightbox-content.module.css';
import { TertiaryGlowingInput } from '@/components/generic/inputs/input';
import { useRef, useState } from 'react';
import { useEditCharacterLightboxContext } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';
import Image from 'next/image';
import { PictureColorsSection } from '@/components/pages/almanax-page/edit-character-lightbox/picture-colors';

export function EditCharacterLightboxContent() {
  const t = useTranslations('edit-character-lightbox');
  const { character, profilePictureId, setProfilePictureId, profilePictureColor } = useEditCharacterLightboxContext();
  const [characterName, setCharacterName] = useState(character.name);
  const [isOpen, setOpen] = useState(false);
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const menuRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className={styles.lightboxContainer}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }}
    >
      <h2>{t('edit-character')}</h2>
      <div className={styles.inputsDiv}>
        <div className={styles.characterNameSection}>
          <div className={styles.characterNameInputDiv}>
            <TertiaryGlowingInput
              labelText={t('character-name-input-label')}
              inputType={'text'}
              inputName={'character-name'}
              inputValue={characterName}
              onInputValueChange={setCharacterName}
            />
          </div>
        </div>
        <div className={styles.seperator}></div>
        <div className={styles.generalPictureSection}>
          <div className={styles.profilePictureSectionContainer}>
            <button
              className={styles.profilePictureContainer}
              style={{ backgroundColor: profilePictureColor }}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Image
                className={styles.profilePicture}
                src={`/profile-pictures/${profilePictureId}.png`}
                alt={'Character profile picture'}
                width={512}
                height={512}
              />
            </button>
            {isOpen && (
              <div className={styles.dropDown} ref={menuRef}>
                <div className={styles.dropDownElementsContainer}>
                  {images.map((index) => (
                    <button
                      className={styles.dropDownOptionsContainer}
                      onClick={() => {
                        setProfilePictureId(index);
                      }}
                      key={index}
                    >
                      <Image
                        className={styles.dropDownOptions}
                        src={`/profile-pictures/${index}.png`}
                        alt={'Character profile picture'}
                        width={512}
                        height={512}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <PictureColorsSection />
        </div>
      </div>
    </div>
  );
}
