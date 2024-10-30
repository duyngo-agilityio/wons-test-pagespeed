import React, { ComponentType } from 'react';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/constants';

export const withAccountState = <T extends { isAdmin: boolean }>(
  WrappedComponent: ComponentType<T>,
) => {
  const WithAdminComponent = (
    props: Omit<T, 'isAdmin'> & React.JSX.IntrinsicAttributes,
  ) => {
    const { data: session } = useSession();

    const { user } = session || {};
    const { role } = user || {};
    const { id: userId } = role || {};

    // Return the wrapped component with the isAdmin prop
    return (
      <WrappedComponent {...(props as T)} isAdmin={ROLES[0].id === userId} />
    );
  };

  return WithAdminComponent;
};
