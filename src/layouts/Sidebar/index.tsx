'use client';

import { useCallback, useEffect, useState } from 'react';

// Constants
import { SIDE_BAR_STATE } from '@/constants';

// Hooks
import { useBreakPoints } from '@/hooks';

// Components
import DesktopSidebar from '@/layouts/Sidebar/DesktopSidebar';
import MobileSidebar from '@/layouts/Sidebar/MobileSidebar';

const Sidebar = () => {
  const { isGreaterThanMd } = useBreakPoints();
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

  return !isGreaterThanMd ? (
    <MobileSidebar
      isToggleMobileSidebar={isToggleMobileSidebar}
      onToggleSidebar={handleToggleMobileSidebar}
      onOutsideClick={handleOutsideClick}
    />
  ) : (
    <DesktopSidebar
      toggleDesktopSidebar={toggleDesktopSidebar}
      onToggleDesktopSidebar={handleToggleDesktopSidebar}
    />
  );
};

export default Sidebar;
