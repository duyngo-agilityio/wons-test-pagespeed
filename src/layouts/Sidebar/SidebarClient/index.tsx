'use client';

import { memo, useCallback, useEffect, useState } from 'react';

// Constants
import { ROLE, SIDE_BAR_STATE } from '@/constants';

// Hooks
import { useBreakPoints } from '@/hooks';

// Components
import DesktopSidebar from '@/layouts/Sidebar/DesktopSidebar';
import MobileSidebar from '@/layouts/Sidebar/MobileSidebar';

interface ISidebarClientProps {
  avatar: string;
  fullName: string;
  role: ROLE;
}

const SidebarClient = ({ avatar, fullName, role }: ISidebarClientProps) => {
  const { isGreaterThanLg } = useBreakPoints();
  const [toggleDesktopSidebar, setToggleDesktopSidebar] = useState<string>('');
  const [isToggleMobileSidebar, setIsToggleMobileSidebar] =
    useState<boolean>(false);

  // Show/hidden desktop sidebar with initial state
  useEffect(() => {
    const getSideBarState = localStorage.getItem('showSidebar');

    if (getSideBarState && toggleDesktopSidebar !== getSideBarState) {
      setToggleDesktopSidebar(getSideBarState);
    }
  }, [toggleDesktopSidebar]);

  // Toggle desktop sidebar
  const handleToggleDesktopSidebar = useCallback(
    () =>
      setToggleDesktopSidebar((prev) => {
        const nextState =
          prev === SIDE_BAR_STATE.OPEN
            ? SIDE_BAR_STATE.CLOSED
            : SIDE_BAR_STATE.OPEN;
        localStorage.setItem('showSidebar', nextState);

        return nextState;
      }),
    [],
  );

  // Toggle mobile sidebar
  const handleToggleMobileSidebar = useCallback(
    () => setIsToggleMobileSidebar(!isToggleMobileSidebar),
    [isToggleMobileSidebar],
  );

  const handleOutsideClick = useCallback(
    () => setIsToggleMobileSidebar(false),
    [],
  );

  return !isGreaterThanLg ? (
    <MobileSidebar
      isToggleMobileSidebar={isToggleMobileSidebar}
      avatar={avatar}
      fullName={fullName}
      role={role}
      onToggleSidebar={handleToggleMobileSidebar}
      onOutsideClick={handleOutsideClick}
    />
  ) : (
    <DesktopSidebar
      toggleDesktopSidebar={toggleDesktopSidebar}
      avatar={avatar}
      fullName={fullName}
      role={role}
      onToggleDesktopSidebar={handleToggleDesktopSidebar}
    />
  );
};

export default memo(SidebarClient);
