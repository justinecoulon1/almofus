type Objective = {
  parameters: {
    parameter0: number;
  };
  need: {
    generated: {
      items: number[];
      quantities: number[];
    };
  };
  className: string;
};

export type DofusDbLabelDto = {
  id: string;
  en: string;
  pt: string;
  es: string;
  fr: string;
};

export type DofusDbNpcDto = {
  id: number;
  name: DofusDbLabelDto;
};

export type DofusDbItemDto = {
  id: number;
  level: number;
  iconId: number;
  name: DofusDbLabelDto;
};

export type DofusDbAlmanaxBonusDto = {
  npcId: number;
  name: DofusDbLabelDto;
  img: string;
  desc: DofusDbLabelDto;
};

export type DofusDbQuestDto = {
  id: number;
  name: DofusDbLabelDto;
  steps: [
    {
      rewards: [{ kamasRatio: number }];
      objectives: Objective[];
    },
  ];
};

export type SyncRequestDto = {
  dofusDbNpcDtos: DofusDbNpcDto[];
  dofusDbItemDtos: DofusDbItemDto[];
  dofusDbAlmanaxBonusDtos: DofusDbAlmanaxBonusDto[];
  dofusDbQuestDtos: DofusDbQuestDto[];
};
