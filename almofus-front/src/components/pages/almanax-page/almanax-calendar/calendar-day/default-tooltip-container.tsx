import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { PlacesType, Tooltip } from 'react-tooltip';
import styles from './default-tooltip-container.module.css';

export function DefaultTooltipContainer({
  place = 'top',
  tooltipId,
  tooltipContent,
  children,
  clickable = false,
  delayShow = 0,
  ...divProps
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  place?: PlacesType;
  tooltipId: string;
  tooltipContent: ReactNode;
  children: ReactNode;
  clickable?: boolean;
  delayShow: number;
}) {
  return (
    <>
      <Tooltip
        className={styles.defaultTooltipContainer}
        id={tooltipId}
        place={place}
        opacity={0.95}
        clickable={clickable}
        delayShow={delayShow}
      >
        {tooltipContent}
      </Tooltip>
      <div {...divProps} data-tooltip-id={tooltipId}>
        {children}
      </div>
    </>
  );
}
