import { useRouter } from '@/i18n/routing';
import { useState } from 'react';
import userRequestProcessor from '@/utils/api/user.request-processor';
import { setLocalStorageItem } from '@/utils/local-storage/local-storage.utils';
import styles from '@/components/global/header/login/login-lightbox/login-lightbox.module.css';
import { useTranslations } from 'next-intl';

export function LoginTab({ setLightboxOpened }: { setLightboxOpened: (isOpened: boolean) => void }) {
  const t = useTranslations('login-lightbox');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    const user = await userRequestProcessor.login(email, password);
    setLocalStorageItem('user', user);
    setLightboxOpened(false);
    router.refresh();
  };
  return (
    <form>
      <div className={styles.inputsDiv}>
        <div className={styles.inputDiv}>
          <label htmlFor="email">{t('email-input-label')}</label>
          <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password">{t('password-input-label')}</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <input
        className={styles.button}
        type="submit"
        value={t('login-input-label')}
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      />
    </form>
  );
}
