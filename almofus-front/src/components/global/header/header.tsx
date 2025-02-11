import { useTranslations } from "next-intl";
import styles from "./header.module.css";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export function Header() {
  const t = useTranslations("header");
  return (
    <div className={styles.header}>
      <div className={styles.logoDiv}>
        <Image src={"/logos.png"} alt={"logo"} width={512} height={512} />
        <h1>{t("maintitle")}</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <Link className={styles.almanaxBtn} href={"/"}>
            {t("almanax")}
          </Link>
          <Link className={styles.characterBtn} href={"/"}>
            {t("character")}
          </Link>
        </ul>
      </nav>
    </div>
  );
}
