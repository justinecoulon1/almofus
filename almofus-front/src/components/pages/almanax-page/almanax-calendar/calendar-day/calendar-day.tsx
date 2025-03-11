import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useLocale, useTranslations } from 'next-intl';
import styles from './calendar-day.module.css';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import classNames from 'classnames';
import { Locales } from '@/i18n/routing';

export function CalendarDay({
  characters,
  dayIndex,
  quest,
  isDisabled,
}: {
  characters: CharacterDto[];
  dayIndex: number;
  quest: AlmanaxQuestDto | undefined;
  isDisabled: boolean;
}) {
  const t = useTranslations('almanax-page');
  const locale = useLocale() as Locales;
  return (
    <div className={classNames(styles.calendarDayContainer, isDisabled && styles.disabled)}>
      <div className={styles.cardHeader}>
        <p>{dayIndex}</p>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <img
            className={classNames(styles.almanaxImage)}
            src={`https://api.dofusdb.fr/img/items/${quest?.item.iconId}.png`}
            alt={'almanax img'}
            width={512}
            height={512}
          />
        </div>
        <div className={styles.itemDesc}>
          <div className={styles.textDiv}>
            <p>x {quest?.itemQuantity}</p>
          </div>
        </div>
      </div>

      <div className={styles.bonusContainer}>
        <p>{quest?.almanaxBonus.nameLabel[locale]}</p>
      </div>
    </div>
  );
}
