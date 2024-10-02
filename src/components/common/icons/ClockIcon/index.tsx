import React, { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface IClockIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const ClockIcon = ({
  color = colors.pink[500],
  width = 16,
  height = 16,
  ...props
}: IClockIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M8 16C3.584 16 0 12.424 0 8C0 3.584 3.584 0 8 0C12.424 0 16 3.584 16 8C16 12.424 12.424 16 8 16ZM10.5523 10.9681C10.6483 11.0241 10.7523 11.0561 10.8643 11.0561C11.0643 11.0561 11.2643 10.9521 11.3763 10.7601C11.5443 10.4801 11.4563 10.1121 11.1683 9.93614L8.32031 8.24014V4.54414C8.32031 4.20814 8.04831 3.94414 7.72031 3.94414C7.39231 3.94414 7.12031 4.20814 7.12031 4.54414V8.58414C7.12031 8.79214 7.23231 8.98414 7.41631 9.09614L10.5523 10.9681Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ClockIcon;
