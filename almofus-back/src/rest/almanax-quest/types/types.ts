import { AlmanaxQuest } from '../../../db/model/almanax-quest.entity';

export type AlmanaxQuestWithYear = AlmanaxQuest & {
  year: number;
};
