import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { MouseEventHandler } from 'react';
import styles from './log-in-lightbox.module.css';

export function LoginLightbox({
  isLightboxOpened,
  setLightboxOpened,
}: {
  isLightboxOpened: boolean;
  setLightboxOpened: (isOpened: boolean) => void;
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
        <div className={styles.titleDiv}><h2>LOGIN</h2></div>
        <form>
          <div className={styles.emailDiv}>
            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' />
          </div>
          <div className={styles.passwordDiv}>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' />
          </div>
          <input className={styles.button} type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
}
