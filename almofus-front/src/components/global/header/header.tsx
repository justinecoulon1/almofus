import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './header.module.css';

export function Header() {
  const t = useTranslations('header');
  return (
    <div className={classNames(styles.header, 'noUserSelect')}>
      <div className={styles.headerContainer}>
        <div className={styles.logoDiv}>
          <Link className={styles.almanaxBtn} href={'/'}>
            <Image src={'/logos.png'} alt={'logo'} width={512} height={512} />
          </Link>
          <h1>{t('maintitle')}</h1>
        </div>
        <nav className={styles.nav}>
          <Link className={styles.almanaxBtn} href={'/almanax'}>
            {t('almanax')}
          </Link>
          <Link className={styles.characterBtn} href={'/shopping'}>
            {t('shopping')}
          </Link>
          <Link className={styles.userBtn} href={'/user'}>
            <Image className={styles.userImg} src={'/icons/user.png'} alt={'user'} width={512} height={512} />
          </Link>
        </nav>
      </div>
    </div>
  );
}
