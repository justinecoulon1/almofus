import { OrangeAccentButtonWithImage } from '@/components/generic/buttons/button-img';
import { useTranslations } from 'next-intl';
import styles from './add-character-button.module.css';

export function AddCharacterButton() {
  const t = useTranslations('almanax-page');
  return (
    <OrangeAccentButtonWithImage
      onClick={async () => {}}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
        }
      }}
      imageSrc={'/icons/add-user.png'}
      imageStyle={styles.addImage}
      imageAlt={'Add Character'}
    />
  );
}
