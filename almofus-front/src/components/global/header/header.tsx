'use client';

import { LoginLightbox } from '@/components/login-lightbox/log-in-lightbox';
import { useLocalStorageItem } from '@/components/utils/env-specific/env-component.utils';
import { Link, useRouter } from '@/i18n/routing';
import { clearLocalStorage } from '@/utils/local-storage/local-storage.utils';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import styles from './header.module.css';
import { LoginTabs } from './login/login-tabs';
import { AlmanaxLink } from './links/almanax-link';
import { ShoppingListLink } from './links/shopping-link';
import { RegisterButton } from './login/register-button';
import { LoginButton } from './login/login-button';

export function Header() {
  const router = useRouter();
  const t = useTranslations('header');
  const user = useLocalStorageItem('user');
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  const [loginTab, setLoginTab] = useState(LoginTabs.LOGIN);
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
          {user ? <AlmanaxLink /> : <LoginButton setLightboxOpened={setLightboxOpened} setLoginTab={setLoginTab} />}
          <LoginLightbox
            isLightboxOpened={isLightboxOpened}
            setLightboxOpened={setLightboxOpened}
            loginTab={loginTab}
            setLoginTab={setLoginTab}
          />
          {user ? (
            <ShoppingListLink />
          ) : (
            <RegisterButton setLightboxOpened={setLightboxOpened} setLoginTab={setLoginTab} />
          )}
          {user && (
            <button
              className={classNames(styles.userBtn, styles.bluePlainButton)}
              onClick={() => {
                clearLocalStorage();
                router.refresh();
              }}
            >
              <Image className={styles.userImg} src={'/icons/user.png'} alt={'user'} width={512} height={512} />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}