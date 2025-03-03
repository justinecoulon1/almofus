import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './character-profile.module.css';
import { CharacterDto } from '@/utils/api/dto/character.dto';
import { EditCharacterLightbox } from '../edit-character-lightbox/edit-character-lightbox';
import { useState } from 'react';
import { CompleteUserDto } from '@/utils/api/dto/user.dto';

export function CharacterProfile({
  disabled = false,
  character,
  user,
}: {
  disabled?: boolean;
  character: CharacterDto;
  user: CompleteUserDto;
}) {
  const t = useTranslations('almanax-page');
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  return (
    <>
      <EditCharacterLightbox
        isLightboxOpened={isLightboxOpened}
        setLightboxOpened={setLightboxOpened}
        character={character}
        user={user}
      />
      <div className={styles.characterProfileDiv}>
        {!disabled && <CharacterProfileInnerContent character={character} setLightboxOpened={setLightboxOpened} />}
      </div>
    </>
  );
}

function CharacterProfileInnerContent({
  character,
  setLightboxOpened,
}: {
  character: CharacterDto;
  setLightboxOpened: (isOpened: boolean) => void;
}) {
  const t = useTranslations('almanax-page');
  return (
    <>
      <button>
        <Image
          className={styles.selectionDisplayImg}
          src={'/icons/selected.png'}
          alt={'selected'}
          width={512}
          height={512}
        />
      </button>
      <button
        onClick={async () => {
          setLightboxOpened(true);
        }}
      >
        <Image className={styles.editImg} src={'/icons/edit.png'} alt={'edit'} width={512} height={512} />
      </button>
      <Image
        className={styles.characterProfileImage}
        src={`/profile-pictures/${character.profilePictureId ?? 0}.png`}
        alt={'character profile'}
        width={512}
        height={512}
      />
      <div className={styles.characterProfileText}>
        <p>{character.name || t('character-default-name')}</p>
      </div>
    </>
  );
}
