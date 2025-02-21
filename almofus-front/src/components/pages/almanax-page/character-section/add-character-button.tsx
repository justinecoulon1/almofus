import { useTranslations } from "next-intl";
import styles from './add-character-button.module.css';
import { GenericButtonWithImage } from "@/components/generic/buttons/button-img";

export function AddCharacterButton() {
    const t = useTranslations('almanax-page');
    return (
        <GenericButtonWithImage
            buttonStyle={styles.addCharacterButton}
            onClick={async () => { }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                }
            }}
            imageSrc={"/icons/add.png"}
            imageStyle={styles.addImage}
            imageAlt={"Add Character"}
        />)
}