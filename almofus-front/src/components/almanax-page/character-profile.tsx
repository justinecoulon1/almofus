import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './character-profile.module.css';

export function CharacterProfile({ disabled = false }: { disabled?: boolean }) {
  const t = useTranslations('almanax-page');
  return (
    <button className={styles.characterSelectionButton}>
      <div className={styles.characterProfileContainer}>
        <div className={styles.imageContainer}>
          {!disabled && (
            <Image
              className={styles.characterProfileImage}
              src={'/icons/user.png'}
              alt={'character profile'}
              width={512}
              height={512}
            />
          )}
        </div>
      </div>
    </button>
  );
}
