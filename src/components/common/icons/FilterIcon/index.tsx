import React, { SVGProps } from 'react';

// themes
import { colors } from '@/themes';

interface IFilterIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const FilterIcon = ({
  color = colors.white,
  width = 14,
  height = 13,
  ...props
}: IFilterIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.853 3.1c0 1.283-1.058 2.324-2.364 2.324C1.184 5.424.125 4.384.125 3.1.125 1.818 1.184.777 2.489.777c1.306 0 2.364 1.04 2.364 2.323Zm7.986-1.017c.572 0 1.036.456 1.036 1.017 0 .562-.464 1.019-1.036 1.019H8.32A1.028 1.028 0 0 1 7.282 3.1c0-.561.464-1.017 1.037-1.017h4.52ZM1.162 9.686h4.52c.572 0 1.037.456 1.037 1.018s-.465 1.019-1.037 1.019h-4.52a1.029 1.029 0 0 1-1.037-1.019c0-.562.464-1.018 1.037-1.018Zm10.349 3.313c1.306 0 2.364-1.04 2.364-2.322 0-1.284-1.058-2.324-2.364-2.324-1.306 0-2.364 1.04-2.364 2.324 0 1.282 1.058 2.322 2.364 2.322Z"
      clipRule="evenodd"
    />
  </svg>
);
export default FilterIcon;
