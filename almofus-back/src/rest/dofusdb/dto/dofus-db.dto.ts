type LabelDto = {
  id: string;
  en: string;
  pt: string;
  es: string;
  fr: string;
};

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

export type DofusDbNpcDto = {
  id: number;
  name: LabelDto;
};

export type DofusDbItemDto = {
  id: number;
  level: number;
  name: LabelDto;
};

export type DofusDbAlmanaxBonusDto = {
  npcId: number;
  name: LabelDto;
  img: string;
  desc: LabelDto;
};

export type DofusDbQuestDto = {
  id: number;
  name: LabelDto;
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
  dofusDbQuestDto: DofusDbQuestDto[];
};
