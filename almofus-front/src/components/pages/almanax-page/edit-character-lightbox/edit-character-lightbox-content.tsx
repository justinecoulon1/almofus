'use client';

import { useTranslations } from 'next-intl';
import styles from './edit-character-lightbox-content.module.css';
import { TertiaryGlowingInput } from '@/components/generic/inputs/input';
import { useState } from 'react';
import { useEditCharacterLightboxContext } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';
import Image from 'next/image';
import { getColor } from '@/components/utils/colors/color-by-id';
import { PictureColorsSection } from '@/components/pages/almanax-page/edit-character-lightbox/picture-colors';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export function EditCharacterLightboxContent() {
  const t = useTranslations('edit-character-lightbox');
  const { character } = useEditCharacterLightboxContext();
  const [characterName, setCharacterName] = useState(character.name);
  const [isPictureEditorTabOpen, setIsPictureEditorTabOpen] = useState(false);
  return (
    <div
      className={styles.lightboxContainer}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={() => {
        if (isPictureEditorTabOpen) {
          setIsPictureEditorTabOpen(false);
        }
      }}
    >
      <h2>{t('edit-character')}</h2>
      <div className={styles.inputsDiv}>
        <div className={styles.characterNameSection}>
          <PictureSelector
            isPictureEditorTabOpen={isPictureEditorTabOpen}
            setIsPictureEditorTabOpen={setIsPictureEditorTabOpen}
          />
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

        <input
          className={styles.submitButton}
          type="submit"
          value={t('save')}
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      </div>
    </div>
  );
}

function PictureSelector({
  isPictureEditorTabOpen,
  setIsPictureEditorTabOpen,
}: {
  isPictureEditorTabOpen: boolean;
  setIsPictureEditorTabOpen: (open: boolean) => void;
}) {
  const { profilePictureId, setProfilePictureId, profilePictureColorId } = useEditCharacterLightboxContext();
  return (
    <div className={styles.profilePictureSectionContainer}>
      <button
        className={styles.profilePictureContainer}
        style={{ backgroundColor: getColor(profilePictureColorId) }}
        onClick={() => setIsPictureEditorTabOpen(!isPictureEditorTabOpen)}
      >
        <Image
          className={styles.profilePicture}
          src={`/profile-pictures/${profilePictureId}.png`}
          alt={'Character profile picture'}
          width={512}
          height={512}
        />

        {isPictureEditorTabOpen && (
          <div className={styles.dropDown} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dropDownPicturesContainer}>
              {images.map((index) => (
                <button
                  className={styles.dropDownPictureContainer}
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfilePictureId(index);
                  }}
                  key={index}
                >
                  <Image
                    className={styles.dropDownPicture}
                    src={`/profile-pictures/${index}.png`}
                    alt={'Character profile picture'}
                    width={512}
                    height={512}
                  />
                </button>
              ))}
            </div>
            <div className={styles.separator} />
            <div className={styles.dropDownColorsContainer}>
              <PictureColorsSection />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
