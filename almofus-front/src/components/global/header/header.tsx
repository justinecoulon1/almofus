import { useTranslations } from "next-intl";
import styles from "./header.module.css";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import classNames from "classnames";

export function Header() {
  const t = useTranslations("header");
  return (
    <div className={classNames(styles.header, "noUserSelect")}>
      <div className={styles.logoDiv}>
        <Link className={styles.almanaxBtn} href={"/"}>
          <Image src={"/logos.png"} alt={"logo"} width={512} height={512} />
        </Link>
        <h1>{t("maintitle")}</h1>
      </div>
      <nav className={styles.nav}>
        <Link className={styles.almanaxBtn} href={"/"}>
          {t("almanax")}
        </Link>
        <Link className={styles.characterBtn} href={"/cart"}>
          {t("character")}
        </Link>{" "}
        <Link className={styles.userBtn} href={"/user"}>
          <Image
            className={styles.userImg}
            src={"/icons/user.png"}
            alt={"user"}
            width={512}
            height={512}
          />
        </Link>
      </nav>
    </div>
  );
}
