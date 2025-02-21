'use client';
import { Locales } from '@/i18n/routing';
import { AlmanaxQuestDto } from '@/utils/api/dto/almanax-quest.dto';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './daily-almanax.module.css';

export function DailyAlmanax({ almanaxQuest }: { almanaxQuest: AlmanaxQuestDto }) {
  const t = useTranslations('daily-almanax');
  const locale = useLocale() as Locales;
  return (
    <div className={styles.dailyAlmanaxContainer}>
      <div className={styles.dateHeader}>
        <p>
          {almanaxQuest.date}/{almanaxQuest.year}
        </p>
      </div>
      <div className={styles.dailyAlmanaxCard}>
        <div className={styles.titleDiv}>
          <button className={styles.arrowButton}>
            <Image className={styles.buttonImg} src={'/icons/left-arrow.png'} alt={'arrow'} width={512} height={512} />
          </button>
          <h2>{almanaxQuest.nameLabel[locale]}</h2>
          <button className={styles.arrowButton}>
            <Image className={styles.buttonImg} src={'/icons/right-arrow.png'} alt={'arrow'} width={512} height={512} />
          </button>
        </div>

        <div className={styles.itemContainer}>
          <img
            className={classNames(styles.almanaxImage)}
            src={`https://api.dofusdb.fr/img/items/${almanaxQuest.item.iconId}.png`}
            alt={'almanax img'}
            width={512}
            height={512}
          />

          <div className={styles.itemDesc}>
            <div className={styles.textDiv}>
              <h3>
                {almanaxQuest.itemQuantity}x {almanaxQuest.item.nameLabel[locale]}
              </h3>
            </div>
            <Image
              className={styles.buttonImg}
              src={'/icons/copy.png'}
              alt={'copy'}
              width={512}
              height={512}
              onClick={() => {
                navigator.clipboard.writeText(almanaxQuest.item.nameLabel[locale]);
              }}
            />
          </div>
        </div>

        <div className={styles.bonusContainer}>
          <div className={styles.titleContainer}>
            <h3>{almanaxQuest.almanaxBonus.nameLabel[locale]}</h3>
          </div>
          <div className={styles.descContainer}>
            <p>{almanaxQuest.almanaxBonus.descLabel[locale]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
