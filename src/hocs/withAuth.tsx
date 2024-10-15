'use client';

import { ReactNode, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

// Configs
import { auth } from '@/configs';

// Constants
import { ROLES } from '@/constants';

interface IWithAuthHOCProps {
  children: ReactNode;
  isNotFound?: boolean;
}

const WithAuthHOC = ({
  children,
  isNotFound,
}: IWithAuthHOCProps): ReactNode => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const session = await auth();
      const { user } = session || {};
      const { role } = user ?? {};
      const { id: userId } = role || {};

      setIsAdmin(ROLES[0].id === userId);
    };

    checkAdmin();
  }, []);

  if (!isAdmin) return <></>;

  if (!isAdmin && !isNotFound) notFound();

  return children;
};

export default WithAuthHOC;
