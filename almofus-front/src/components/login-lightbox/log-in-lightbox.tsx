import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { MouseEventHandler } from 'react';
import { LoginTabs } from '../global/header/login-tabs';
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
        {loginTab === LoginTabs.LOGIN && <LoginTab />}
        {loginTab === LoginTabs.REGISTER && <RegisterTab />}
      </div>
    </div>
  );
}

function LoginTab({}) {
  return (
    <form>
      <div className={styles.inputsDiv}>
        <div className={styles.inputDiv}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
      </div>
      <input className={styles.button} type="submit" value="LOGIN" />
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
      <input className={styles.button} type="submit" value="LOGIN" />
    </form>
  );
}
