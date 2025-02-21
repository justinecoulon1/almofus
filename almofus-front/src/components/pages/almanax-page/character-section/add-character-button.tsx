import { useTranslations } from "next-intl";
import styles from './add-character-button.module.css';
import { GenericButton } from "@/components/generic/buttons/button";

export function AddCharacterButton() {
    const t = useTranslations('almanax-page');
    return (
        <GenericButton style={styles.addCharacterButton}
            label={t('addCharacter')}
            onClick={async () => {
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                }
            }}
        />)
}