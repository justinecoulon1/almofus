import classNames from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';
import styles from './lightbox.module.css';

export function GenericLightbox({
  isLightboxOpened,
  setLightboxOpened,
  children,
}: {
  isLightboxOpened: boolean;
  setLightboxOpened: (isOpened: boolean) => void;
  children: ReactNode;
}) {
  const closeLightbox: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLightboxOpened(false);
  };
  return (
    <div
      className={classNames(styles.loginLightBoxContainer, { [styles.hidden]: !isLightboxOpened })}
      onMouseDown={closeLightbox}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setLightboxOpened(false);
        }
      }}
    >
      {children}
    </div>
  );
}
