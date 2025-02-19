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
import { LoginTabs } from './login-tabs';

export function Header() {
  const router = useRouter();
  const t = useHeaderTranslations();
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
              className={styles.userBtn}
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
export function AlmanaxLink() {
  const t = useHeaderTranslations();
  return (
    <Link className={styles.almanaxBtn} href={'/almanax'}>
      {t('almanax')}
    </Link>
  );
}
export function LoginButton({
  setLightboxOpened,
  setLoginTab,
}: {
  setLightboxOpened: (isOpened: boolean) => void;
  setLoginTab: (newTab: LoginTabs) => void;
}) {
  const t = useHeaderTranslations();
  return (
    <button
      className={styles.almanaxBtn}
      onClick={async () => {
        setLightboxOpened(true);
        setLoginTab(LoginTabs.LOGIN);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setLightboxOpened(false);
          setLoginTab(LoginTabs.LOGIN);
        }
      }}
    >
      {t('login')}
    </button>
  );
}

export function ShoppingListLink() {
  const t = useHeaderTranslations();
  return (
    <Link className={styles.almanaxBtn} href={'/shopping'}>
      {t('shopping')}
    </Link>
  );
}

export function RegisterButton({
  setLightboxOpened,
  setLoginTab,
}: {
  setLightboxOpened: (isOpened: boolean) => void;
  setLoginTab: (newTab: LoginTabs) => void;
}) {
  const t = useHeaderTranslations();
  return (
    <button
      className={styles.almanaxBtn}
      onClick={async () => {
        setLightboxOpened(true);
        setLoginTab(LoginTabs.REGISTER);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setLightboxOpened(false);
          setLoginTab(LoginTabs.REGISTER);
        }
      }}
    >
      {t('register')}
    </button>
  );
}

function useHeaderTranslations() {
  return useTranslations('header');
}
