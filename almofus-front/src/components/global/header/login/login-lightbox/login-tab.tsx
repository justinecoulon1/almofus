import { useRouter } from '@/i18n/routing';
import { useState } from 'react';
import userRequestProcessor from '@/utils/api/user.request-processor';
import { setLocalStorageItem } from '@/utils/local-storage/local-storage.utils';
import styles from '@/components/global/header/login/login-lightbox/login-lightbox.module.css';
import { useTranslations } from 'next-intl';
import { TertiaryGlowingInput } from '@/components/generic/inputs/input';

export function LoginTab({ setLightboxOpened }: { setLightboxOpened: (isOpened: boolean) => void }) {
  const t = useTranslations('login-lightbox');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    const loginResponse = await userRequestProcessor.login(email, password);
    setLocalStorageItem('user', loginResponse.user);
    setLocalStorageItem('accessToken', loginResponse.accessToken);
    setLightboxOpened(false);
    router.refresh();
  };
  return (
    <form>
      <div className={styles.inputsDiv}>
        <TertiaryGlowingInput
          labelText={t('email-input-label')}
          inputType={'text'}
          inputName={'email'}
          inputValue={email}
          onInputValueChange={setEmail}
        />
        <TertiaryGlowingInput
          labelText={t('password-input-label')}
          inputType={'password'}
          inputName={'password'}
          inputValue={password}
          onInputValueChange={setPassword}
        />
      </div>
      <input
        className={styles.buttonInput}
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
