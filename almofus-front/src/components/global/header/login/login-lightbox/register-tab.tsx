import styles from '@/components/global/header/login/login-lightbox/login-lightbox.module.css';
import { useTranslations } from 'next-intl';

export function RegisterTab({}) {
  const t = useTranslations('login-lightbox');
  return (
    <form>
      <div className={styles.inputsDiv}>
        <div className={styles.inputDiv}>
          <label htmlFor="pseudo">{t('pseudo-input-label')}</label>
          <input type="text" name="pseudo" id="pseudo" />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="email">{t('email-input-label')}</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password">{t('password-input-label')}</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="confirm-password">{t('password-confirmation-input-label')}</label>
          <input type="password" name="confirm-password" id="confirm-password" />
        </div>
      </div>
      <input
        className={styles.button}
        type="submit"
        value={t('register-input-label')}
        onClick={(e) => {
          e.preventDefault();
        }}
      />
    </form>
  );
}
