'use client';

import { useTranslations } from 'next-intl';
import { GenericLightbox } from '@/components/generic/lightbox/lightbox';
import { EditCharacterLightboxContent } from './edit-character-lighbox-content';

export function EditCharacterLightbox({
    isLightboxOpened,
    setLightboxOpened,
}: {
    isLightboxOpened: boolean;
    setLightboxOpened: (isOpened: boolean) => void;
}) {
    const t = useTranslations('edit-character-lightbox');
    return (
        <GenericLightbox isLightboxOpened={isLightboxOpened} setLightboxOpened={setLightboxOpened} children={<EditCharacterLightboxContent />} />
    );
}