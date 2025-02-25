import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './character-profile.module.css';
import { CharacterDto } from '@/utils/api/dto/character.dto';

export function CharacterProfile({
  disabled = false,
  character,
  setLightboxOpened,
}: {
  disabled?: boolean;
  character: CharacterDto,
  setLightboxOpened: (isOpened: boolean) => void
}) {
  const t = useTranslations('almanax-page');
  return <div className={styles.characterProfileDiv}>{!disabled && <CharacterProfileInnerContent character={character} setLightboxOpened={setLightboxOpened} />}</div>;
}

function CharacterProfileInnerContent({ character, setLightboxOpened }: {
  character: CharacterDto, setLightboxOpened: (isOpened: boolean) => void;
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
      <button onClick={async () => {
        setLightboxOpened(true);
      }}>
        <Image
          className={styles.editImg}
          src={'/icons/edit.png'}
          alt={'edit'}
          width={512}
          height={512}
        />
      </button>
      <Image
        className={styles.characterProfileImage}
        src={'/icons/user.png'}
        alt={'character profile'}
        width={512}
        height={512}
      />
      <div className={styles.characterProfileText}>
        <p>{character.name || t('characterDefaultName')}</p>
      </div>
    </>
  );
}
