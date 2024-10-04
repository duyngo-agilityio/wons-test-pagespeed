import React, { SVGProps } from 'react';

interface ILocationIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const LocationIcon = ({
  color = '#3A36DB',
  width = 11,
  height = 12,
  ...props
}: ILocationIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    viewBox="0 0 11 12"
    fill="none"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M0 4.99065C0 2.23073 2.30633 0 5.09607 0C7.89367 0 10.2 2.23073 10.2 4.99065C10.2 6.38141 9.6942 7.67258 8.8617 8.76695C7.94328 9.97411 6.81129 11.0259 5.53713 11.8515C5.24551 12.0423 4.98232 12.0567 4.66227 11.8515C3.38084 11.0259 2.24885 9.97411 1.3383 8.76695C0.50519 7.67258 0 6.38141 0 4.99065ZM3.41621 5.14606C3.41621 6.07064 4.17067 6.79782 5.09574 6.79782C6.02142 6.79782 6.78314 6.07064 6.78314 5.14606C6.78314 4.22869 6.02142 3.46611 5.09574 3.46611C4.17067 3.46611 3.41621 4.22869 3.41621 5.14606Z"
      clipRule="evenodd"
    />
  </svg>
);
export default LocationIcon;
