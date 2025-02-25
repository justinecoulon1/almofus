'use client';

import { useTranslations } from 'next-intl';
import styles from './edit-character-lightbox-content.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { SecondaryButtonWithImage, SecondaryDarkButtonWithImage } from '@/components/generic/buttons/button-img';

export function EditCharacterLightboxContent() {
    const t = useTranslations('edit-character-lightbox');
    const [isEditable, setIsEditable] = useState(false);
    return (
        <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
            <div className={styles.characterNameContainer}>
                <input type="text" className={classNames(styles.nameInput, { [styles.editable]: !isEditable })} />
                <SecondaryButtonWithImage
                    className={styles.editButton} imageStyle={styles.editImage} imageSrc='/icons/edit.png' imageAlt='edit' onClick={() => {
                        if (isEditable) {
                            setIsEditable(false);
                        } else {
                            setIsEditable(true)
                        }
                    }
                    } />
            </div>
        </div >
    );
}