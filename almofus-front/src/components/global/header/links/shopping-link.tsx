import { useTranslations } from "next-intl";
import styles from '../header.module.css';
import Link from "next/link";

export function ShoppingListLink() {
    const t = useTranslations('header');
    return (
        <Link className={styles.bluePlainButton} href={'/shopping'}>
            {t('shopping')}
        </Link>
    );
}