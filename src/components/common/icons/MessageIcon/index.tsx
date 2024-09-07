import React, { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface IMessageIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const MessageIcon = ({
  color = colors.blue[800],
  width = 20,
  height = 20,
  ...props
}: IMessageIcon) => (
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
      d="M16.253 2.693a2.545 2.545 0 0 1 2.54-2.546c1.402 0 2.54 1.141 2.54 2.546a2.545 2.545 0 0 1-2.54 2.546 2.545 2.545 0 0 1-2.54-2.546Zm-4.058 10.934 3.046-3.94-.042.022a.792.792 0 0 0 .084-.792.777.777 0 0 0-.642-.465.81.81 0 0 0-.739.327l-2.55 3.307-2.92-2.303a.831.831 0 0 0-.602-.17.816.816 0 0 0-.527.317l-3.119 4.068-.064.095a.79.79 0 0 0 .221 1.003.884.884 0 0 0 .485.159.747.747 0 0 0 .622-.317l2.646-3.413 3.004 2.261.095.063a.788.788 0 0 0 1.002-.222ZM14.43 2.028a5.013 5.013 0 0 0-.064.793c0 2.377 1.919 4.298 4.28 4.298.264 0 .517-.03.78-.073v8.524c0 3.582-2.108 5.705-5.692 5.705h-7.79c-3.585 0-5.693-2.123-5.693-5.705V7.754c0-3.592 2.108-5.725 5.694-5.725h8.485Z"
      clipRule="evenodd"
    />
  </svg>
);
export default MessageIcon;
