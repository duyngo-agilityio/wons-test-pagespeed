import React, { SVGProps } from 'react';

// Themes
import { colors } from '@/themes';

interface IInvoiceIcon extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

const InvoiceIcon = ({
  color = colors.blue[800],
  width = 20,
  height = 20,
  ...props
}: IInvoiceIcon) => (
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
      d="M21.11 7.035a.775.775 0 0 1-.541.219c-.755 0-1.366.595-1.366 1.32 0 .73.604 1.322 1.352 1.33.42.004.779.29.779.7v2.545c0 2.143-1.785 3.88-3.987 3.88h-3.323a.614.614 0 0 1-.622-.605V14.28a.747.747 0 0 0-.765-.744.754.754 0 0 0-.765.744v2.144a.613.613 0 0 1-.62.606H4.236C2.044 17.03.25 15.293.25 13.149v-2.546c0-.41.358-.695.779-.7.748-.007 1.352-.6 1.352-1.33 0-.704-.592-1.24-1.366-1.24a.774.774 0 0 1-.54-.218.734.734 0 0 1-.225-.526v-2.57C.25 1.878 2.048.127 4.246.127h7.005c.343 0 .621.27.621.605v2.541a.76.76 0 0 0 .765.744.754.754 0 0 0 .765-.744V.734c0-.335.278-.606.622-.606h3.323c2.202 0 3.986 1.737 3.986 3.88V6.51a.734.734 0 0 1-.224.526Zm-8.473 4.576a.754.754 0 0 0 .765-.744v-3.97a.754.754 0 0 0-.765-.745.76.76 0 0 0-.764.745v3.97a.76.76 0 0 0 .764.744Z"
      clipRule="evenodd"
    />
  </svg>
);
export default InvoiceIcon;
