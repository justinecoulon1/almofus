import styles from './picture-colors.module.css';
import { useEditCharacterLightboxContext } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';

const colors = ['white', 'red', 'grey', 'blue', '#abcd00', 'yellow', 'orange'];

export function PictureColorsSection() {
  const { setProfilePictureColor } = useEditCharacterLightboxContext();
  return (
    <div className={styles.colorsDiv}>
      {colors.map((color, index) => (
        <button
          value={color}
          key={index}
          className={styles.colorButton}
          onClick={() => setProfilePictureColor(color)}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
