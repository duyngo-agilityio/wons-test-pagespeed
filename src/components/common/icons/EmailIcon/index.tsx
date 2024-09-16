import React, { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface IEmailIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const EmailIcon = ({
  color = colors.blue[500],
  width = 16,
  height = 14,
  ...props
}: IEmailIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    viewBox="0 0 16 14"
    {...props}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.6192 0C12.6622 0 13.6656 0.412222 14.4037 1.15189C15.1426 1.89 15.5556 2.88556 15.5556 3.92778V10.0722C15.5556 12.2422 13.79 14 11.6192 14H3.93556C1.76478 14 0 12.2422 0 10.0722V3.92778C0 1.75778 1.757 0 3.93556 0H11.6192ZM12.8567 5.08673L12.9189 5.02451C13.1048 4.79895 13.1048 4.47229 12.9103 4.24673C12.8022 4.13084 12.6537 4.06007 12.4989 4.04451C12.3356 4.03595 12.18 4.09118 12.0626 4.20007L8.55556 7.00007C8.10444 7.37418 7.45811 7.37418 7 7.00007L3.5 4.20007C3.25811 4.02118 2.92367 4.04451 2.72222 4.25451C2.51222 4.46451 2.48889 4.79895 2.667 5.03229L2.76889 5.1334L6.30778 7.89451C6.74333 8.23673 7.27144 8.4234 7.82444 8.4234C8.37589 8.4234 8.91333 8.23673 9.34811 7.89451L12.8567 5.08673Z"
      fill="currentColor"
    />
  </svg>
);
export default EmailIcon;