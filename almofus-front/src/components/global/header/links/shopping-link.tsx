import { useTranslations } from "next-intl";
import styles from '../header.module.css';
import { GenericLink } from "@/components/generic/links/link";

export function ShoppingListLink() {
    const t = useTranslations('header');
    return (
        <GenericLink style={styles.bluePlainButton} label={t('shopping')} href={'/shopping'} />
    );
}