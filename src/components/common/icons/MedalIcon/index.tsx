import { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface IMedalIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const MedalIcon = ({
  color = colors.pink[500],
  width = 13,
  height = 18,
  ...props
}: IMedalIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13 18"
      fill="none"
      {...props}
    >
      <circle cx="6.5" cy="6.5" r="6.5" fill={color} />
      <path
        d="M3.81152 10L7.67523 11.0353L5.86349 17.7968L4.19046 16.3132L1.99979 16.7615L3.81152 10Z"
        fill={color}
      />
      <path
        d="M9.86328 10L5.99958 11.0353L7.81131 17.7968L9.48434 16.3132L11.675 16.7615L9.86328 10Z"
        fill={color}
      />
      <circle cx="6.5" cy="6.5" r="3.5" fill="white" />
    </svg>
  );
};

export default MedalIcon;
