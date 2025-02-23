import { OrangeAccentButtonWithImage } from '@/components/generic/buttons/button-img';
import { useRouter } from '@/i18n/routing';
import characterRequestProcessor from '@/utils/api/character.request-processor';
import { CompleteUserDto } from '@/utils/api/dto/user.dto';
import { setLocalStorageItem } from '@/utils/local-storage/local-storage.utils';
import { useTranslations } from 'next-intl';
import styles from './add-character-button.module.css';

export function AddCharacterButton({ user }: { user: CompleteUserDto }) {
  const t = useTranslations('almanax-page');
  const router = useRouter();
  const createCharacter = async () => {
    const character = await characterRequestProcessor.createCharacter(user.id);
    user.characters.push(character);
    setLocalStorageItem('user', user);
    router.refresh();
  };
  return (
    <OrangeAccentButtonWithImage
      onClick={async () => {
        createCharacter();
      }}
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
