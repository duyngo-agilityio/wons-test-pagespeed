'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

interface ILayoutProvider {
  children: ReactNode;
}

const LayoutProvider = ({ children }: ILayoutProvider) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default LayoutProvider;
