export type CharacterDto = {
  id: number;
  name: string;
  profilePictureId: number;
  profilePictureColorId: number;
};

export type UpdateCharacterRequestDto = {
  name?: string;
  profilePictureId?: number;
  profilePictureColorId?: number;
};
