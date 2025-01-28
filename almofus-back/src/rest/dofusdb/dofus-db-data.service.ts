import { Injectable } from '@nestjs/common';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';
import { ItemRepository } from 'src/db/repositories/item/item.repository';
import { LabelRepository } from 'src/db/repositories/label/label.repository';
import {
    DofusDbAlmanaxBonusDto,
    DofusDbItemDto,
    DofusDbNpcDto,
    DofusDbQuestDto,
    SyncRequestDto,
} from './dto/dofus-db.dto';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { Item } from 'src/db/model/item.entity';
import { Label } from 'src/db/model/label.entity';

@Injectable()
export class DofusDbDataService {
    private isSyncStarted = false;
    private dofusDbNpcDtos: DofusDbNpcDto[] = [];
    private dofusDbItemDtos: DofusDbItemDto[] = [];
    private dofusDbAlmanaxBonusDtos: DofusDbAlmanaxBonusDto[] = [];
    private dofusDbQuestDto: DofusDbQuestDto[] = [];

    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly almanaxQuestRepository: AlmanaxQuestRepository,
        private readonly labelRepository: LabelRepository,
    ) { }

    mapDofusDbDataToEntities(syncRequestDto: SyncRequestDto) {
        if (this.isSyncStarted) {
            throw new Error('Sync already started');
        } else {
            try {
                this.isSyncStarted = true;

                this.dofusDbNpcDtos = syncRequestDto.dofusDbNpcDtos;
                this.dofusDbItemDtos = syncRequestDto.dofusDbItemDtos;
                this.dofusDbAlmanaxBonusDtos = syncRequestDto.dofusDbAlmanaxBonusDtos;
                this.dofusDbQuestDto = syncRequestDto.dofusDbQuestDto;

                const almanaxQuestEntities = this.dofusDbQuestDto.map((questDto) =>
                    this.mapQuestDtoToEntity(questDto),
                );
            } finally {
                this.isSyncStarted = false;
            }
        }
    }

    mapQuestDtoToEntity(dofusDbQuestDto: DofusDbQuestDto): AlmanaxQuest {
        const dofusDbItemDtoId =
            dofusDbQuestDto.steps.objectives[0].need.generated.items[0];
        const dofusDbNpcDtoId =
            dofusDbQuestDto.steps.objectives[3].parameters.parameter0;

        const dofusDbItemDto: DofusDbItemDto = this.findItemById(dofusDbItemDtoId);
        const dofusDbNpcDto: DofusDbNpcDto = this.findNpcById(dofusDbNpcDtoId);
        const dofusDbAlmanaxBonusDto: DofusDbAlmanaxBonusDto = this.findAlmanaxBonusById(dofusDbNpcDtoId);

        const itemNameLabel = new Label();
        itemNameLabel.fr = dofusDbItemDto.nameLabelDto.fr;
        itemNameLabel.en = dofusDbItemDto.nameLabelDto.en;

        const item = new Item();
        item.dofusId = dofusDbItemDto.id;
        item.level = dofusDbItemDto.level;
        item.nameLabel = Promise.resolve(itemNameLabel);

        const questNameLabel = new Label();
        questNameLabel.fr = dofusDbQuestDto.nameLabelDto.fr;
        questNameLabel.en = dofusDbQuestDto.nameLabelDto.en;

        const npcNameLabel = new Label();
        npcNameLabel.fr = dofusDbNpcDto.nameLabelDto.fr;
        npcNameLabel.en = dofusDbNpcDto.nameLabelDto.en;

        const bonusEffectDescriptionLabel = new Label();
        bonusEffectDescriptionLabel.fr = dofusDbAlmanaxBonusDto.descLabelDto.fr;
        bonusEffectDescriptionLabel.en = dofusDbAlmanaxBonusDto.descLabelDto.en;

        const almanaxQuest = new AlmanaxQuest();
        almanaxQuest.itemQuantity = dofusDbQuestDto.steps.objectives[0].need.generated.quantities[0];
        almanaxQuest.dofusNpcId = dofusDbNpcDtoId
        almanaxQuest.kamaReward = dofusDbQuestDto.steps.rewards[0].kamaRatio;
        almanaxQuest.item = Promise.resolve(item);
        almanaxQuest.nameLabel = Promise.resolve(questNameLabel);
        almanaxQuest.npcNameLabel = Promise.resolve(npcNameLabel);
        almanaxQuest.bonusEffectDescriptionLabel = Promise.resolve(bonusEffectDescriptionLabel);

        return almanaxQuest;
    }

    findItemById(dofusId: number): DofusDbItemDto {
        return this.dofusDbItemDtos.find((item) => item.id === dofusId);
    }

    findNpcById(dofusId: number): DofusDbNpcDto {
        return this.dofusDbNpcDtos.find((npc) => npc.id === dofusId);
    }

    findAlmanaxBonusById(dofusId: number): DofusDbAlmanaxBonusDto {
        return this.dofusDbAlmanaxBonusDtos.find((almanaxBonus) => almanaxBonus.npcId === dofusId);
    }
}
