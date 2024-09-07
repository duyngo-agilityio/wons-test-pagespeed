import React, { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface IDashboardIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const DashboardIcon = ({
  color = colors.blue[800],
  width = 20,
  height = 20,
  ...props
}: IDashboardIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.54 0h3.38c1.41 0 2.54 1.15 2.54 2.561V5.97c0 1.42-1.13 2.56-2.54 2.56H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0Zm0 11.47h3.38c1.41 0 2.54 1.14 2.54 2.56v3.41c0 1.41-1.13 2.56-2.54 2.56H2.54C1.14 20 0 18.85 0 17.44v-3.41c0-1.42 1.14-2.56 2.54-2.56ZM17.46 0h-3.38c-1.41 0-2.54 1.15-2.54 2.561V5.97c0 1.42 1.13 2.56 2.54 2.56h3.38c1.4 0 2.54-1.14 2.54-2.56V2.561C20 1.15 18.86 0 17.46 0Zm-3.38 11.47h3.38c1.4 0 2.54 1.14 2.54 2.56v3.41c0 1.41-1.14 2.56-2.54 2.56h-3.38c-1.41 0-2.54-1.15-2.54-2.56v-3.41c0-1.42 1.13-2.56 2.54-2.56Z"
      clipRule="evenodd"
    />
  </svg>
);
export default DashboardIcon;
