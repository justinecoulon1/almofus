import { useTranslations } from 'next-intl';
import styles from './must-log-in-section.module.css';

export function MustLogInSection() {
  const t = useTranslations('mustlogin');
  return <div className={styles.loginLightBoxContainer}></div>;
}
