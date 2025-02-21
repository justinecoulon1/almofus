import Image from 'next/image';
import { KeyboardEventHandler, MouseEventHandler } from 'react';

export function GenericButtonWithImage({
  buttonStyle,
  onClick,
  onKeyDown,
  imageSrc,
  imageStyle,
  imageLabel,
  imageSize = 512,
}: {
  buttonStyle: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  imageSrc: string;
  imageStyle: string;
  imageLabel: string;
  imageSize?: number;
}) {
  return (
    <button className={buttonStyle} onClick={onClick} onKeyDown={onKeyDown}>
      <Image className={imageStyle} src={imageSrc} alt={imageLabel} width={imageSize} height={imageSize} />
    </button>
  );
}
