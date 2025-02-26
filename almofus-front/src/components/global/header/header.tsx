'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './header.module.css';
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
          <h1>{t('main-title')}</h1>
        </div>
        <HeaderNav />
      </div>
    </div>
  );
}
