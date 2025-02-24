'use client';

import { GenericButtonWithImage } from '@/components/generic/buttons/button-img';
import { useLocalStorageItem } from '@/components/utils/env-specific/env-component.utils';
import { Link, useRouter } from '@/i18n/routing';
import { clearLocalStorage } from '@/utils/local-storage/local-storage.utils';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import styles from './header.module.css';
import { AlmanaxLink } from './links/almanax-link';
import { ShoppingListLink } from './links/shopping-link';
import { LoginButton } from './login/login-button';
import { LoginLightbox } from './login/login-lightbox/log-in-lightbox';
import { LoginTabs } from './login/login-tabs';
import { RegisterButton } from './login/register-button';
import { HeaderNav } from './nav';

export function Header() {
  const t = useTranslations('header');
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoDiv}>
          <Link className={styles.almanaxBtn} href={'/'}>
            <Image src={'/logos.png'} alt={'logo'} width={93} height={128} />
          </Link>
          <h1>{t('maintitle')}</h1>
        </div>
        <HeaderNav />
      </div>
    </div>
  );
}
