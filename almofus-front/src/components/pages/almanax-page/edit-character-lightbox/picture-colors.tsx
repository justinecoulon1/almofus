import styles from './picture-colors.module.css';
import classNames from 'classnames';
import { useEditCharacterLightboxContext } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';

export function PictureColorsSection() {
  const { setProfilePictureColor } = useEditCharacterLightboxContext();
  return (
    <div className={styles.colorsDiv}>
      <button
        value="transparent"
        className={classNames(styles.colorButton, styles.transparentButton)}
        onClick={(e) => setProfilePictureColor(e.currentTarget.value)}
      ></button>
      <button
        value="red"
        className={classNames(styles.colorButton, styles.redButton)}
        onClick={(e) => setProfilePictureColor(e.currentTarget.value)}
      ></button>
      <button
        value="grey"
        className={classNames(styles.colorButton, styles.greyButton)}
        onClick={(e) => setProfilePictureColor(e.currentTarget.value)}
      ></button>
      <button
        value="blue"
        className={classNames(styles.colorButton, styles.blueButton)}
        onClick={(e) => setProfilePictureColor(e.currentTarget.value)}
      ></button>
      <button
        value="green"
        className={classNames(styles.colorButton, styles.greenButton)}
        onClick={(e) => setProfilePictureColor(e.currentTarget.value)}
      ></button>
      <button
        value="yellow"
        className={classNames(styles.colorButton, styles.yellowButton)}
        onClick={(e) => setProfilePictureColor(e.currentTarget.value)}
      ></button>
    </div>
  );
}
