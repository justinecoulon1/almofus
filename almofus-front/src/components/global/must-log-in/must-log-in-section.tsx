import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './must-log-in-section.module.css';

export function MustLogInSection() {
  const t = useTranslations('must-login');
  return (
    <div className={styles.mustLogInSectionContainer}>
      <Image
        className={styles.mustLogInImage}
        src={'/icons/restriction.png'}
        alt={'must be logged in'}
        width={512}
        height={512}
      />
      <h2 className={styles.errorMessage}>{t('error-message')}</h2>
    </div>
  );
}
