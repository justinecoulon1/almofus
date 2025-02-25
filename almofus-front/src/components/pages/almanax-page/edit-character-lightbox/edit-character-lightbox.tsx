'use client';

import { useTranslations } from 'next-intl';
import { GenericLightbox } from '@/components/generic/lightbox/lightbox';
import { EditCharacterLightboxContent } from './edit-character-lighbox-content';
import { CharacterDto } from '@/utils/api/dto/character.dto';

export function EditCharacterLightbox({
    isLightboxOpened,
    setLightboxOpened,
    character
}: {
    isLightboxOpened: boolean;
    setLightboxOpened: (isOpened: boolean) => void;
    character: CharacterDto
}) {
    const t = useTranslations('edit-character-lightbox');
    return (
        <GenericLightbox isLightboxOpened={isLightboxOpened} setLightboxOpened={setLightboxOpened} children={<EditCharacterLightboxContent character={character} />} />
    );
}