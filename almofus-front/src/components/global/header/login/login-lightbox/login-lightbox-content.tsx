import styles from '@/components/global/header/login/login-lightbox/login-lightbox.module.css';
import classNames from 'classnames';
import { LoginTabs } from '@/components/global/header/login/login-tabs';
import { useTranslations } from 'next-intl';
import { LoginTab } from '@/components/global/header/login/login-lightbox/login-tab';
import { RegisterTab } from '@/components/global/header/login/login-lightbox/register-tab';

export function LoginLightboxContent({
  setLightboxOpened,
  loginTab,
  setLoginTab,
}: {
  setLightboxOpened: (isOpened: boolean) => void;
  loginTab: LoginTabs;
  setLoginTab: (newTab: LoginTabs) => void;
}) {
  const t = useTranslations('login-lightbox');
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.titleDiv}>
        <div
          className={classNames(styles.loginTab, styles.loginButtons, {
            [styles.selected]: loginTab === LoginTabs.LOGIN,
          })}
          onClick={() => setLoginTab(LoginTabs.LOGIN)}
        >
          <h2>{t('login')}</h2>
        </div>
        <div
          className={classNames(styles.registerTab, styles.loginButtons, {
            [styles.selected]: loginTab === LoginTabs.REGISTER,
          })}
          onClick={() => setLoginTab(LoginTabs.REGISTER)}
        >
          <h2>{t('register')}</h2>
        </div>
      </div>
      {loginTab === LoginTabs.LOGIN && <LoginTab setLightboxOpened={setLightboxOpened} />}
      {loginTab === LoginTabs.REGISTER && <RegisterTab />}
    </div>
  );
}
