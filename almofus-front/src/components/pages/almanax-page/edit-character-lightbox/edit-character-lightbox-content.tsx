'use client';

import { useTranslations } from 'next-intl';
import styles from './edit-character-lightbox-content.module.css';
import { TertiaryGlowingInput } from '@/components/generic/inputs/input';
import { useState } from 'react';
import { useEditCharacterLightboxContext } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';
import Image from 'next/image';
import { colorById, getColor } from '@/components/utils/colors/color-by-id';
import classNames from 'classnames';
import { SecondaryButtonWithImage, TertiaryButtonWithImage } from '@/components/generic/buttons/button-img';
import { UpdateCharacterRequestDto } from '@/utils/api/dto/character.dto';
import characterRequestProcessor from '@/utils/api/character.request-processor';
import { setLocalStorageItem } from '@/utils/local-storage/local-storage.utils';
import { CompleteUserDto } from '@/utils/api/dto/user.dto';
import { useRouter } from '@/i18n/routing';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export function EditCharacterLightboxContent({
  user,
  setLightboxOpened,
}: {
  user: CompleteUserDto;
  setLightboxOpened: (isOpened: boolean) => void;
}) {
  const t = useTranslations('edit-character-lightbox');
  const { character, profilePictureId, profilePictureColorId, setProfilePictureId, setProfilePictureColorId } =
    useEditCharacterLightboxContext();
  const [characterName, setCharacterName] = useState(character.name);
  const [isPictureEditorTabOpen, setIsPictureEditorTabOpen] = useState(false);
  const router = useRouter();
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.profileEditorTabsContainer}>
        <div
          className={classNames(styles.mainProfileEditorTabContainer, {
            [styles.isDisplayed]: !isPictureEditorTabOpen,
          })}
        >
          <h2 className={styles.editCharacterTitle}>{t('edit-character')}</h2>
          <div className={styles.inputsDiv}>
            <div className={styles.characterNameSection}>
              <button className={styles.startEditPictureButton} onClick={() => setIsPictureEditorTabOpen(true)}>
                <ProfilePicture isEditable={true} />
              </button>
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
              onClick={async (e) => {
                const updateRequestDto: UpdateCharacterRequestDto = {
                  name: characterName,
                  profilePictureId: profilePictureId,
                  profilePictureColorId: profilePictureColorId,
                };
                user.characters = await characterRequestProcessor.updateCharacter(character.id, updateRequestDto);
                setLocalStorageItem('user', user);
                setLightboxOpened(false);
                router.refresh();
                e.preventDefault();
              }}
            />
          </div>
        </div>
        <div className={classNames(styles.pictureEditorTabContainer, { [styles.isDisplayed]: isPictureEditorTabOpen })}>
          <div className={styles.profilePictureRecapContainer}>
            <div className={styles.buttonsContainer}>
              <TertiaryButtonWithImage
                className={styles.editPictureButton}
                imageStyle={styles.editPictureButtonImage}
                imageSrc={'/icons/check.png'}
                imageAlt={'validate'}
                onClick={() => setIsPictureEditorTabOpen(false)}
              />
              <SecondaryButtonWithImage
                className={styles.editPictureButton}
                imageStyle={styles.editPictureButtonImage}
                imageSrc={'/icons/close.png'}
                imageAlt={'copy'}
                onClick={() => {
                  setProfilePictureId(character.profilePictureId);
                  setProfilePictureColorId(character.profilePictureColorId);
                  setIsPictureEditorTabOpen(false);
                }}
              />
            </div>
          </div>
          <div className={styles.pictureEditorTabContentContainer}>
            <div className={styles.editedProfilePictureContainer}>
              <ProfilePicture isEditable={false} />
            </div>
            <PictureSelector />
            <PictureColorsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePicture({ isEditable }: { isEditable: boolean }) {
  const { profilePictureId, profilePictureColorId } = useEditCharacterLightboxContext();
  return (
    <div className={styles.profilePictureSectionContainer}>
      <div className={styles.profilePictureContainer} style={{ backgroundColor: getColor(profilePictureColorId) }}>
        {isEditable && (
          <div className={styles.editButtonContainer}>
            <Image className={styles.editButton} src={`/icons/edit.png`} alt={'edit'} width={512} height={512} />
          </div>
        )}
        <Image
          className={styles.profilePicture}
          src={`/profile-pictures/${profilePictureId ?? 0}.png`}
          alt={'Character profile picture'}
          width={512}
          height={512}
        />
      </div>
    </div>
  );
}

function PictureSelector() {
  const { setProfilePictureId } = useEditCharacterLightboxContext();
  return (
    <div className={styles.pictureSelectorContainer}>
      {images.map((index) => (
        <button
          className={styles.pictureContainer}
          onClick={() => {
            setProfilePictureId(index);
          }}
          key={index}
        >
          <Image
            className={styles.picture}
            src={`/profile-pictures/${index}.png`}
            alt={'Character profile picture'}
            width={512}
            height={512}
          />
        </button>
      ))}
    </div>
  );
}

function PictureColorsSection() {
  const { setProfilePictureColorId } = useEditCharacterLightboxContext();
  return (
    <div className={styles.colorSelectorContainer}>
      {Object.entries(colorById).map(([id, color]) => (
        <button
          value={color}
          key={id}
          className={styles.colorButton}
          onClick={(e) => {
            e.stopPropagation();
            setProfilePictureColorId(parseInt(id));
          }}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
