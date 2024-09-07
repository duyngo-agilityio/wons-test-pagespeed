import React, { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface IAnalyticsIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const AnalyticsIcon = ({
  color = colors.blue[800],
  width = 20,
  height = 20,
  ...props
}: IAnalyticsIcon) => (
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
      d="M5.33 0h9.339C18.07 0 19.99 1.929 20 5.33v9.34c0 3.4-1.93 5.33-5.331 5.33H5.33C1.929 20 0 18.07 0 14.67V5.33C0 1.929 1.929 0 5.33 0Zm4.719 15.86c.431 0 .79-.32.83-.75V4.92a.815.815 0 0 0-.379-.79.84.84 0 0 0-1.281.79v10.19c.051.43.41.75.83.75Zm4.601 0c.42 0 .779-.32.83-.75v-3.28a.839.839 0 0 0-1.28-.79.806.806 0 0 0-.38.79v3.28c.04.43.399.75.83.75Zm-8.431-.75a.827.827 0 0 1-.83.75c-.43 0-.79-.32-.829-.75V8.2a.84.84 0 0 1 .39-.79c.269-.17.61-.17.88 0 .269.17.42.479.389.79v6.91Z"
      clipRule="evenodd"
    />
  </svg>
);
export default AnalyticsIcon;
