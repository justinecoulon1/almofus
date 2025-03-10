import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './calendar-day.module.css';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import classNames from 'classnames';

export function CalendarDay({
  characters,
  dayIndex,
  quest,
}: {
  characters: CharacterDto[];
  dayIndex: number;
  quest: AlmanaxQuestDto | undefined;
}) {
  const t = useTranslations('almanax-page');
  return (
    <div className={styles.calendarDayContainer}>
      <div className={styles.cardHeader}>
        <p>{dayIndex}</p>
      </div>
      <div className={styles.itemContainer}>
        <img
          className={classNames(styles.almanaxImage)}
          src={`https://api.dofusdb.fr/img/items/${quest?.item.iconId}.png`}
          alt={'almanax img'}
          width={512}
          height={512}
        />
      </div>
    </div>
  );
}
