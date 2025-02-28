'use client';

import React, { createContext, useContext, useState } from 'react';
import { CharacterDto } from '@/utils/api/dto/character.dto';

export type EditCharacterLightboxContextType = {
  profilePictureId: number;
  setProfilePictureId: (id: number) => void;
  profilePictureColor: string;
  setProfilePictureColor: (value: string) => void;
  character: CharacterDto;
};

const EditCharacterLightboxContext = createContext<EditCharacterLightboxContextType>({
  profilePictureId: 0,
  setProfilePictureId: () => {},
  profilePictureColor: 'none',
  setProfilePictureColor: () => {},
  character: { id: 0, name: '', profilePictureId: 0 },
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
  const [profilePictureId, setProfilePictureId] = useState(character.profilePictureId || 0);
  const [profilePictureColor, setProfilePictureColor] = useState('transparent');
  return (
    <EditCharacterLightboxContext.Provider
      value={{ profilePictureId, setProfilePictureId, character, profilePictureColor, setProfilePictureColor }}
    >
      {children}
    </EditCharacterLightboxContext.Provider>
  );
}
