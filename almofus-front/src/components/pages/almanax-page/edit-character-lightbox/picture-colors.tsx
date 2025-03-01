import styles from './picture-colors.module.css';
import { useEditCharacterLightboxContext } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';
import { colorById } from '@/components/utils/colors/color-by-id';

export function PictureColorsSection() {
  const { setProfilePictureColorId } = useEditCharacterLightboxContext();
  return (
    <div className={styles.colorsDiv}>
      {Object.entries(colorById).map(([id, color]) => (
        <button
          value={color}
          key={id}
          className={styles.colorButton}
          onClick={(e) => {
            e.stopPropagation();
            setProfilePictureColorId(id);
          }}
          style={{ backgroundColor: color === 'transparent' ? 'white' : color }}
        />
      ))}
    </div>
  );
}
