'use client';

import { PrimaryButtonWithImage } from '@/components/generic/buttons/button-img';
import { AlmanaxLink } from './links/almanax-link';
import { ShoppingListLink } from './links/shopping-link';
import { LoginButton } from './login/login-button';
import { LoginLightbox } from './login/login-lightbox/log-in-lightbox';
import { RegisterButton } from './login/register-button';
import { clearLocalStorage } from '@/utils/local-storage/local-storage.utils';
import styles from './nav.module.css';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useLocalStorageItem } from '@/components/utils/env-specific/env-component.utils';
import { useState } from 'react';
import { LoginTabs } from './login/login-tabs';

export function HeaderNav() {
  const router = useRouter();
  const t = useTranslations('header');
  const user = useLocalStorageItem('user');
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  const [loginTab, setLoginTab] = useState(LoginTabs.LOGIN);
  return (
    <nav className={styles.nav}>
      {user ? <AlmanaxLink /> : <LoginButton setLightboxOpened={setLightboxOpened} setLoginTab={setLoginTab} />}
      <LoginLightbox
        isLightboxOpened={isLightboxOpened}
        setLightboxOpened={setLightboxOpened}
        loginTab={loginTab}
        setLoginTab={setLoginTab}
      />
      {user ? <ShoppingListLink /> : <RegisterButton setLightboxOpened={setLightboxOpened} setLoginTab={setLoginTab} />}
      {user && (
        <PrimaryButtonWithImage
          className={styles.userBtn}
          onClick={() => {
            clearLocalStorage();
            router.refresh();
          }}
          imageSrc={'/icons/user.png'}
          imageStyle={styles.userImg}
          imageAlt={'user'}
          imageSize={512}
        />
      )}
    </nav>
  );
}
