import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './calendar-day.module.css';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import classNames from 'classnames';
import { Locales } from '@/i18n/routing';
import { DefaultTooltipContainer } from '@/components/pages/almanax-page/almanax-calendar/calendar-day/default-tooltip-container';
import { ItemDto } from '@/utils/api/dto/item.dto';

export function CalendarDay({
  characters,
  dayIndex,
  quest,
  isDisabled,
  locale,
}: {
  characters: CharacterDto[];
  dayIndex: number;
  quest: AlmanaxQuestDto | undefined;
  isDisabled: boolean;
  locale: Locales;
}) {
  const t = useTranslations('almanax-page');
  return (
    <div className={classNames(styles.calendarDayContainer, isDisabled && styles.disabled)}>
      <div className={styles.cardHeader}>
        <p>{dayIndex}</p>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <DefaultTooltipContainer
            className={styles.bonusContainer}
            tooltipId={`tooltip-item-${quest?.item?.id}`}
            tooltipContent={<ItemTooltipContent questItem={quest?.item} locale={locale} />}
            clickable={true}
            place={'top'}
            delayShow={300}
          >
            <img
              className={classNames(styles.almanaxImage)}
              src={`https://api.dofusdb.fr/img/items/${quest?.item.iconId}.png`}
              alt={'almanax img'}
              width={512}
              height={512}
            />
          </DefaultTooltipContainer>
        </div>
        <div className={styles.itemDesc}>
          <div className={styles.textDiv}>
            <p>x {quest?.itemQuantity}</p>
          </div>
        </div>
      </div>
      <DefaultTooltipContainer
        className={styles.bonusContainer}
        tooltipId={`tooltip-quest-${quest?.id}`}
        tooltipContent={<BonusTooltipContent quest={quest} locale={locale} />}
        clickable={true}
        place={'top'}
        delayShow={300}
      >
        <div className={styles.nameLabelDivContainer}>
          <p>{quest?.almanaxBonus?.nameLabel?.[locale]}</p>
        </div>
      </DefaultTooltipContainer>
    </div>
  );
}

function BonusTooltipContent({ quest, locale }: { quest: AlmanaxQuestDto | undefined; locale: Locales }) {
  return (
    <div className={styles.tooltipContent}>
      <p className={styles.nameLabel}>{quest?.almanaxBonus.nameLabel[locale]}</p>
      <p className={styles.descLabel}>{quest?.almanaxBonus.descLabel[locale]}</p>
    </div>
  );
}

function ItemTooltipContent({ questItem, locale }: { questItem: ItemDto | undefined; locale: Locales }) {
  return (
    <div className={styles.tooltipContent}>
      <p className={styles.nameLabel}>{questItem?.nameLabel[locale]}</p>
      <p className={styles.descLabel}>{questItem?.level}</p>
    </div>
  );
}
