import React, { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface INotificationIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const NotificationIcon = ({
  color = colors.blue[800],
  width = 20,
  height = 20,
  ...props
}: INotificationIcon) => (
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
      d="M16.862 7.368c0 1.326.35 2.108 1.12 3.01.584.663.77 1.516.77 2.44 0 .924-.303 1.8-.91 2.512a4.779 4.779 0 0 1-3.057 1.493c-1.656.141-3.313.26-4.993.26-1.68 0-3.337-.07-4.993-.26a4.773 4.773 0 0 1-3.057-1.493 3.824 3.824 0 0 1-.91-2.512c0-.924.187-1.777.77-2.44.793-.902 1.12-1.684 1.12-3.01v-.45c0-1.777.442-2.939 1.353-4.076C5.428 1.183 7.598.188 9.745.188h.094c2.193 0 4.433 1.043 5.764 2.773.863 1.114 1.259 2.227 1.259 3.957v.45ZM6.706 19.267c0-.532.487-.776.938-.88.527-.112 3.738-.112 4.265 0 .45.104.938.348.938.88-.026.506-.323.955-.732 1.24a3.828 3.828 0 0 1-1.807.773 3.99 3.99 0 0 1-1.062 0 3.81 3.81 0 0 1-1.806-.774c-.411-.284-.708-.733-.734-1.24Z"
      clipRule="evenodd"
    />
  </svg>
);
export default NotificationIcon;
