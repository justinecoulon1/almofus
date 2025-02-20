import { useTranslations } from "next-intl";
import styles from '../header.module.css';
import { GenericLink } from "@/components/generic/links/link";

export function AlmanaxLink() {
    const t = useTranslations('header');
    return (
        <GenericLink style={styles.orangePlainButton} label={t('almanax')} href={'/almanax'} />
    );
}