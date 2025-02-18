'use client';

import { LoginLightbox } from '@/components/login-lightbox/log-in-lightbox';
import { useLocalStorageItem } from '@/components/utils/env-specific/env-component.utils';
import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import styles from './header.module.css';

export function Header() {
  const t = useTranslations('header');
  const user = useLocalStorageItem('user');
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  return (
    <div className={classNames(styles.header, 'noUserSelect')}>
      <div className={styles.headerContainer}>
        <div className={styles.logoDiv}>
          <Link className={styles.almanaxBtn} href={'/'}>
            <Image src={'/logos.png'} alt={'logo'} width={93} height={128} />
          </Link>
          <h1>{t('maintitle')}</h1>
        </div>
        <nav className={styles.nav}>
          <Link
            className={styles.almanaxBtn}
            href={user ? '/almanax' : '/'}
            onClick={async () => {
              if (!user) {
                setLightboxOpened(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setLightboxOpened(false);
              }
            }}
          >
            {t(user ? 'almanax' : 'login')}
          </Link>
          <LoginLightbox isLightboxOpened={isLightboxOpened} setLightboxOpened={setLightboxOpened} />
          <Link className={styles.characterBtn} href={user ? '/shopping' : '/register'}>
            {t(user ? 'shopping' : 'register')}
          </Link>
          {user && (
            <Link className={styles.userBtn} href={'/user'}>
              <Image className={styles.userImg} src={'/icons/user.png'} alt={'user'} width={512} height={512} />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
