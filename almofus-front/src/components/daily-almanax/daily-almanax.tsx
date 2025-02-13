import { useTranslations } from "next-intl";
import styles from "./daily-almanax.module.css";
import classNames from "classnames";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export function DailyAlmanax() {
  const t = useTranslations("daily-almanax");
  return (
    <div className={classNames(styles.dailyAlmanaxContainer)}>
      <div className={styles.titleDiv}>
        <Link href={""}>
          <Image
            className={styles.buttonImg}
            src={"/icons/left-arrow.png"}
            alt={"arrow"}
            width={512}
            height={512}
          />
        </Link>
        <h2>ALMANAX OF THE DAY</h2>
        <Link href={""}>
          <Image
            className={styles.buttonImg}
            src={"/icons/right-arrow.png"}
            alt={"arrow"}
            width={512}
            height={512}
          />
        </Link>
      </div>
      <Image
        className={classNames(styles.almanaxImage)}
        src={"/images/54008.png"}
        alt={"almanax img"}
        width={512}
        height={512}
      />
    </div>
  );
}
