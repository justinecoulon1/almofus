'use client';

import { GenericLightbox } from '@/components/generic/lightbox/lightbox';
import { EditCharacterLightboxContent } from './edit-character-lighbox-content';
import { CharacterDto } from '@/utils/api/dto/character.dto';

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
      <EditCharacterLightboxContent character={character} />
    </GenericLightbox>
  );
}
