import { useTranslations } from "next-intl";
import styles from "./header.module.css";

export function Header() {
  const t = useTranslations("home");
  return <div className={styles.header}>{t("maintitle")}</div>;
}
