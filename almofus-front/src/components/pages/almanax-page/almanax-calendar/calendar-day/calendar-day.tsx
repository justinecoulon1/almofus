import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useLocale, useTranslations } from 'next-intl';
import styles from './calendar-day.module.css';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import classNames from 'classnames';
import { Locales } from '@/i18n/routing';
import { Tooltip } from 'react-tooltip';

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
        <a data-tooltip-id={`tooltip-${quest?.id}`}>
          <p>{quest?.almanaxBonus.nameLabel[locale]}</p>
        </a>
        <Tooltip className={styles.tooltip} id={`tooltip-${quest?.id}`} place={'top'} clickable>
          <TooltipContent quest={quest} />
        </Tooltip>
      </div>
    </div>
  );
}

function TooltipContent({ quest }: { quest: AlmanaxQuestDto | undefined }) {
  const locale = useLocale() as Locales;
  return (
    <div className={styles.tooltipContent}>
      <p className={styles.nameLabel}>{quest?.almanaxBonus.nameLabel[locale]}</p>
      <p className={styles.descLabel}>{quest?.almanaxBonus.descLabel[locale]}</p>
    </div>
  );
}
