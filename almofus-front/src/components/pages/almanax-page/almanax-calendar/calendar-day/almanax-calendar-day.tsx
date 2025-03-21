import styles from './calendar-day.module.css';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import classNames from 'classnames';
import { Locales } from '@/i18n/routing';
import { DefaultTooltipContainer } from '@/components/pages/almanax-page/almanax-calendar/calendar-day/default-tooltip-container';
import { ItemDto } from '@/utils/api/dto/item.dto';

export function AlmanaxCalendarDay({
  dayIndex,
  quest,
  isDisabled,
  locale,
}: {
  dayIndex: number;
  quest: AlmanaxQuestDto | undefined;
  isDisabled: boolean;
  locale: Locales;
}) {
  return (
    <div className={classNames(styles.calendarDayContainer, isDisabled && styles.disabled)}>
      <div className={styles.cardHeader}>
        <p>{dayIndex}</p>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <ItemImage questItem={quest?.item} />
        </div>
        <div className={styles.itemDesc}>
          <div className={styles.textDiv}>
            <p>
              {quest?.itemQuantity} x {quest?.item.nameLabel[locale]}
            </p>
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
        <div className={styles.bonusLabelsDivContainer}>
          <p>{quest?.almanaxBonus?.nameLabel?.[locale]}</p>
        </div>
      </DefaultTooltipContainer>
    </div>
  );
}

function BonusTooltipContent({ quest, locale }: { quest: AlmanaxQuestDto | undefined; locale: Locales }) {
  return (
    <div className={classNames(styles.bonusTooltipContent, styles.tooltip)}>
      <p className={styles.nameLabel}>{quest?.almanaxBonus.nameLabel[locale]}</p>
      <p className={styles.descLabel}>{quest?.almanaxBonus.descLabel[locale]}</p>
    </div>
  );
}

function ItemImage({ questItem }: { questItem: ItemDto | undefined }) {
  return (
    <img
      key={`quest-item-icon-${questItem?.iconId}`}
      className={classNames(styles.almanaxImage)}
      src={`https://api.dofusdb.fr/img/items/${questItem?.iconId}.png`}
      alt={'Item'}
      width={512}
      height={512}
    />
  );
}
