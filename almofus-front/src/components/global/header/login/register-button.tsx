import { useTranslations } from 'next-intl';
import { LoginTabs } from './login-tabs';
import { PrimaryButton } from '@/components/generic/buttons/button';

export function RegisterButton({
  setLightboxOpened,
  setLoginTab,
}: {
  setLightboxOpened: (isOpened: boolean) => void;
  setLoginTab: (newTab: LoginTabs) => void;
}) {
  const t = useTranslations('header');
  return (
    <PrimaryButton
      label={t('register')}
      onClick={async () => {
        setLightboxOpened(true);
        setLoginTab(LoginTabs.REGISTER);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setLightboxOpened(false);
          setLoginTab(LoginTabs.REGISTER);
        }
      }}
    />
  );
}
