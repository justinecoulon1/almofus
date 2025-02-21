import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './character-profile.module.css';

export function CharacterProfile({ disabled = false }: { disabled?: boolean }) {
  const t = useTranslations('almanax-page');
  return <button className={styles.characterSelectionButton}>{!disabled && <CharacterProfileInnerContent />}</button>;
}

function CharacterProfileInnerContent() {
  return (
    <>
      <Image
        className={styles.selectionDisplayImg}
        src={'/icons/selected.png'}
        alt={'selected'}
        width={512}
        height={512}
      />
      <Image
        className={styles.characterProfileImage}
        src={'/icons/user.png'}
        alt={'character profile'}
        width={512}
        height={512}
      />
      <div className={styles.characterProfileText}>
        <p>character n</p>
      </div>
    </>
  );
}
