import Image from 'next/image';
import React from 'react';
import styles from './buttons.module.css';

interface CompleteGenericButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: string;
  imageSrc: string;
  imageStyle?: string;
  imageAlt: string;
  imageSize?: number;
}

interface ButtonProps extends Omit<CompleteGenericButtonProps, 'buttonStyle'> {}

export function OrangeAccentButtonWithImage(props: ButtonProps) {
  return <GenericButtonWithImage buttonStyle={styles.orangeButton} {...props} />;
}

export function PrimaryButtonWithImage(props: ButtonProps) {
  return <GenericButtonWithImage buttonStyle="fgezrger" {...props} />;
}

export function GenericButtonWithImage({
  buttonStyle,
  imageSrc,
  imageStyle,
  imageAlt: imageLabel,
  imageSize = 512,
  ...buttonProps
}: CompleteGenericButtonProps) {
  return (
    <button className={buttonStyle} {...buttonProps}>
      <Image className={imageStyle} src={imageSrc} alt={imageLabel} width={imageSize} height={imageSize} />
    </button>
  );
}
