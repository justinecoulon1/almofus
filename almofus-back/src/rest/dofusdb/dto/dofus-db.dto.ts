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
    nameLabelDto: LabelDto;
};

export type DofusDbItemDto = {
    id: number;
    level: number;
    nameLabelDto: LabelDto;
};

export type DofusDbAlmanaxBonusDto = {
    npcId: number;
    nameLabelDto: LabelDto;
    img: string;
    descLabelDto: LabelDto;
};

export type DofusDbQuestDto = {
    id: number;
    nameLabelDto: LabelDto;
    steps: {
        rewards: [{ kamaRatio: number }];
        objectives: Objective[];
    };
};

export type SyncRequestDto = {
    dofusDbNpcDtos: DofusDbNpcDto[];
    dofusDbItemDtos: DofusDbItemDto[];
    dofusDbAlmanaxBonusDtos: DofusDbAlmanaxBonusDto[];
    dofusDbQuestDto: DofusDbQuestDto[];
};
