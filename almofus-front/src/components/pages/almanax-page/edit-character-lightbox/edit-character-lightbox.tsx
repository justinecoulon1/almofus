'use client';

import { GenericLightbox } from '@/components/generic/lightbox/lightbox';
import { EditCharacterLightboxContent } from './edit-character-lighbox-content';
import { CharacterDto } from '@/utils/api/dto/character.dto';
import { EditCharacterLightboxProvider } from '@/components/pages/almanax-page/edit-character-lightbox/edit-character-lightbox-context';

export function EditCharacterLightbox({
  isLightboxOpened,
  setLightboxOpened,
  character,
}: {
  isLightboxOpened: boolean;
  setLightboxOpened: (isOpened: boolean) => void;
  character: CharacterDto;
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} setLightboxOpened={setLightboxOpened}>
      <EditCharacterLightboxProvider character={character}>
        <EditCharacterLightboxContent />
      </EditCharacterLightboxProvider>
    </GenericLightbox>
  );
}
