import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import styles from './buttons.module.css';

interface CompleteGenericButtonWithImageProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: string;
  imageSrc: string;
  imageStyle?: string;
  imageAlt: string;
  imageSize?: number;
}

interface ButtonProps extends Omit<CompleteGenericButtonWithImageProps, 'buttonStyle'> { }

export function SecondaryButtonWithImage(props: ButtonProps) {
  return <GenericButtonWithImage buttonStyle={styles.secondaryButton} {...props} />;
}

export function PrimaryButtonWithImage(props: ButtonProps) {
  return <GenericButtonWithImage buttonStyle={styles.primaryButton} {...props} />;
}

export function GenericButtonWithImage({
  buttonStyle,
  imageSrc,
  imageStyle,
  imageAlt: imageLabel,
  imageSize = 512,
  ...buttonProps
}: CompleteGenericButtonWithImageProps) {
  return (
    <button {...buttonProps} className={classNames(buttonStyle, buttonProps.className)}>
      <Image className={imageStyle} src={imageSrc} alt={imageLabel} width={imageSize} height={imageSize} />
    </button>
  );
}
