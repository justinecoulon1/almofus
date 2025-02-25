'use client';

import { useTranslations } from 'next-intl';
import styles from './edit-character-lightbox-content.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { SecondaryButtonWithImage } from '@/components/generic/buttons/button-img';
import { CharacterDto } from '@/utils/api/dto/character.dto';

export function EditCharacterLightboxContent({ character }: { character: CharacterDto }) {
    const t = useTranslations('edit-character-lightbox');
    const [isEditable, setIsEditable] = useState(false);
    const [characterName, setCharacterName] = useState(character.name);
    console.log(characterName)
    return (
        <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
            <h2>EDIT CHARACTER</h2>
            <div className={styles.characterNameContainer}>
                <input type="text" className={classNames(styles.nameInput, { [styles.editable]: !isEditable })}
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)} />
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