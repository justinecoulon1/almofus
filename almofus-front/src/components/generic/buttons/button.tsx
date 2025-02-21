import { KeyboardEventHandler, MouseEventHandler } from 'react';

export function GenericButton({
  style,
  label,
  onClick,
  onKeyDown,
}: {
  style: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={style} onClick={onClick} onKeyDown={onKeyDown}>
      {label}
    </button>
  );
}
