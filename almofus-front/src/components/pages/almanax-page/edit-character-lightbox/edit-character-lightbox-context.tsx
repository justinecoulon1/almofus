'use client';

import React, { createContext, useContext, useState } from 'react';
import { CharacterDto } from '@/utils/api/dto/character.dto';

export type EditCharacterLightboxContextType = {
  profilePictureId: number;
  setProfilePictureId: (id: number) => void;
  profilePictureColorId: number;
  setProfilePictureColorId: (value: number) => void;
  character: CharacterDto;
  characterName: string;
  setCharacterName: (name: string) => void;
};

const EditCharacterLightboxContext = createContext<EditCharacterLightboxContextType>({
  profilePictureId: 0,
  setProfilePictureId: () => {},
  profilePictureColorId: 0,
  setProfilePictureColorId: () => {},
  character: { id: 0, name: '', profilePictureId: 0, profilePictureColorId: 0 },
  characterName: '',
  setCharacterName: () => {},
});

export function useEditCharacterLightboxContext(): EditCharacterLightboxContextType {
  const context = useContext(EditCharacterLightboxContext);
  if (!context) {
    throw new Error('useEditCharacterLightboxContext must be used within a EditCharacterLightboxProvider');
  }
  return context;
}

export function EditCharacterLightboxProvider({
  character,
  children,
}: Readonly<{
  character: CharacterDto;
  children: React.ReactNode;
}>) {
  const [profilePictureId, setProfilePictureId] = useState(character.profilePictureId);
  const [profilePictureColorId, setProfilePictureColorId] = useState(character.profilePictureColorId);
  const [characterName, setCharacterName] = useState(character.name);
  return (
    <EditCharacterLightboxContext.Provider
      value={{
        profilePictureId,
        setProfilePictureId,
        character,
        profilePictureColorId,
        setProfilePictureColorId,
        characterName,
        setCharacterName,
      }}
    >
      {children}
    </EditCharacterLightboxContext.Provider>
  );
}
