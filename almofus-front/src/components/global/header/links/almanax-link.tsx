import { useTranslations } from "next-intl";
import styles from '../header.module.css';
import Link from "next/link";

export function AlmanaxLink() {
    const t = useTranslations('header');
    return (
        <Link className={styles.orangePlainButton} href={'/almanax'}>
            {t('almanax')}
        </Link>
    );
}