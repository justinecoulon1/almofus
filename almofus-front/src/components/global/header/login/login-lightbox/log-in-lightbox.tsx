import { useRouter } from '@/i18n/routing';
import userRequestProcessor from '@/utils/api/user.request-processor';
import { setLocalStorageItem } from '@/utils/local-storage/local-storage.utils';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { MouseEventHandler, useState } from 'react';
import { LoginTabs } from '../login-tabs';
import styles from './log-in-lightbox.module.css';

export function LoginLightbox({
  isLightboxOpened,
  setLightboxOpened,
  loginTab,
  setLoginTab,
}: {
  isLightboxOpened: boolean;
  setLightboxOpened: (isOpened: boolean) => void;
  loginTab: LoginTabs;
  setLoginTab: (newTab: LoginTabs) => void;
}) {
  const t = useTranslations('loginLightbox');
  const closeLightbox: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLightboxOpened(false);
  };
  return (
    <div
      className={classNames(styles.loginLightBoxContainer, { [styles.hidden]: !isLightboxOpened })}
      onMouseDown={closeLightbox}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setLightboxOpened(false);
        }
      }}
    >
      <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.titleDiv}>
          <div
            className={classNames(styles.loginTab, styles.loginButtons, {
              [styles.selected]: loginTab === LoginTabs.LOGIN,
            })}
            onClick={() => setLoginTab(LoginTabs.LOGIN)}
          >
            <h2>LOGIN</h2>
          </div>
          <div
            className={classNames(styles.registerTab, styles.loginButtons, {
              [styles.selected]: loginTab === LoginTabs.REGISTER,
            })}
            onClick={() => setLoginTab(LoginTabs.REGISTER)}
          >
            <h2>REGISTER</h2>
          </div>
        </div>
        {loginTab === LoginTabs.LOGIN && <LoginTab setLightboxOpened={setLightboxOpened} />}
        {loginTab === LoginTabs.REGISTER && <RegisterTab />}
      </div>
    </div>
  );
}

function LoginTab({ setLightboxOpened }: { setLightboxOpened: (isOpened: boolean) => void }) {
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
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password">Password</label>
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
        value="LOGIN"
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      />
    </form>
  );
}

function RegisterTab({}) {
  return (
    <form>
      <div className={styles.inputsDiv}>
        <div className={styles.inputDiv}>
          <label htmlFor="pseudo">Pseudo</label>
          <input type="text" name="pseudo" id="pseudo" />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input type="password" name="confirm-password" id="confirm-password" />
        </div>
      </div>
      <input
        className={styles.button}
        type="submit"
        value="REGISTER"
        onClick={(e) => {
          e.preventDefault();
        }}
      />
    </form>
  );
}
