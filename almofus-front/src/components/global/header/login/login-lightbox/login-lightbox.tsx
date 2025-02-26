import { LoginTabs } from '../login-tabs';
import { GenericLightbox } from '@/components/generic/lightbox/lightbox';
import { LoginLightboxContent } from '@/components/global/header/login/login-lightbox/login-lightbox-content';

export function LoginLightbox({
  isLightboxOpened,
  setLightboxOpened,
  loginTab,
  setLoginTab,
}: {
  isLightboxOpened: boolean;
  setLightboxOpened: (isOpened: boolean) => void;
  loginTab: LoginTabs;
  setLoginTab: (newTab: LoginTabs) => void;
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} setLightboxOpened={setLightboxOpened}>
      <LoginLightboxContent setLightboxOpened={setLightboxOpened} loginTab={loginTab} setLoginTab={setLoginTab} />
    </GenericLightbox>
  );
}
