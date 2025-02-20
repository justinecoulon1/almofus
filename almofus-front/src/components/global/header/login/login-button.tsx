import { useTranslations } from "next-intl";
import styles from '../header.module.css';
import { LoginTabs } from "./login-tabs";
import { GenericButton } from "@/components/generic/buttons/button";

export function LoginButton({
    setLightboxOpened,
    setLoginTab,
}: {
    setLightboxOpened: (isOpened: boolean) => void;
    setLoginTab: (newTab: LoginTabs) => void;
}) {
    const t = useTranslations('header');
    return (
        <GenericButton style={styles.orangePlainButton}
            label={t('login')}
            onClick={async () => {
                setLightboxOpened(true);
                setLoginTab(LoginTabs.LOGIN);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    setLightboxOpened(false);
                    setLoginTab(LoginTabs.LOGIN);
                }
            }}
        />)
}