import styles from './almanax-list.module.css';
import { Dayjs } from 'dayjs';
import { useQuestsQuery } from '@/components/pages/almanax-page/almanax-page-utils/quests-query';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import classNames from 'classnames';
import { useLocale } from 'next-intl';
import { Locales } from '@/i18n/routing';

export default function AlmanaxList({ currentDayjs }: { currentDayjs: Dayjs }) {
  const { data: currentMonthQuests } = useQuestsQuery(currentDayjs);
  const locale = useLocale() as Locales;
  return (
    <div className={styles.listContainer}>
      {currentMonthQuests?.map((quest) => (
        <AlmanaxListDay key={`almanaxListDay-${quest.id}`} quest={quest} locale={locale} />
      ))}
    </div>
  );
}

function AlmanaxListDay({ quest, locale }: { quest: AlmanaxQuestDto; locale: Locales }) {
  const dateToString = quest.date.toString();
  const formattedDate = dateToString.slice(-2);
  return (
    <div className={styles.almanaxListDay}>
      <div className={styles.leftPart}>
        <div>{formattedDate}</div>
        <div className={styles.itemContainer}>
          <div className={styles.imageContainer}>
            <img
              key={`quest-item-icon-${quest?.item.iconId}`}
              className={classNames(styles.almanaxImage)}
              src={`https://api.dofusdb.fr/img/items/${quest?.item.iconId}.png`}
              alt={'Item'}
              width={512}
              height={512}
            />
          </div>
          <div className={styles.itemDesc}>
            <div className={styles.textDiv}>
              <p>
                {quest?.itemQuantity} x {quest?.item.nameLabel[locale]}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bonusLabelsDivContainer}>
          <div className={styles.bonusNameLabelContainer}>
            <p>{quest?.almanaxBonus?.nameLabel?.[locale]}</p>
          </div>
          <div className={styles.bonusDescLabelContainer}>
            <p>{quest?.almanaxBonus?.descLabel?.[locale]}</p>
          </div>
        </div>
      </div>

      <div className={styles.rightPart}>
        <div className={styles.questNameDiv}>{quest?.nameLabel[locale]}</div>
      </div>
    </div>
  );
}
