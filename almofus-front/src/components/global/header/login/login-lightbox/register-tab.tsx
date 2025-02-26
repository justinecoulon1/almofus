import styles from '@/components/global/header/login/login-lightbox/login-lightbox.module.css';
import { useTranslations } from 'next-intl';
import { TertiaryGlowingInput } from '@/components/generic/inputs/input';
import { useState } from 'react';

export function RegisterTab({}) {
  const t = useTranslations('login-lightbox');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <form>
      <div className={styles.inputsDiv}>
        <TertiaryGlowingInput
          labelText={t('pseudo-input-label')}
          inputType={'text'}
          inputName={'pseudo'}
          inputValue={pseudo}
          onInputValueChange={setPseudo}
        />
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
        <TertiaryGlowingInput
          labelText={t('password-confirmation-input-label')}
          inputType={'password'}
          inputName={'confirm-password'}
          inputValue={confirmPassword}
          onInputValueChange={setConfirmPassword}
        />
      </div>
      <input
        className={styles.buttonInput}
        type="submit"
        value={t('register-input-label')}
        onClick={(e) => {
          e.preventDefault();
        }}
      />
    </form>
  );
}
