import { memo } from 'react';
import clsx from 'clsx';

// Constants
import { SIDE_BAR_STATE } from '@/constants';

// Actions
import { signOut } from '@/actions';

// Components
import NavigateList from '@/layouts/Sidebar/NavigateList';
import SidebarFooter from '@/layouts/Sidebar/SidebarFooter';
import SidebarHeader from '@/layouts/Sidebar/SidebarHeader';

interface IDesktopSidebar {
  toggleDesktopSidebar: string;
  onToggleDesktopSidebar: () => void;
}

const DesktopSidebar = ({
  toggleDesktopSidebar,
  onToggleDesktopSidebar,
}: IDesktopSidebar) => (
  <section
    className={clsx(
      'relative',
      toggleDesktopSidebar === SIDE_BAR_STATE.OPEN ? 'left-0' : 'm-7.5',
    )}
  >
    <div
      className={clsx(
        'bg-white dark:bg-gray-400 px-6.25 py-7.5 flex flex-col duration-700 min-h-full',
        toggleDesktopSidebar === SIDE_BAR_STATE.OPEN
          ? 'max-w-60'
          : 'max-w-20 items-center rounded-10',
      )}
    >
      <SidebarHeader
        isToggle={toggleDesktopSidebar === SIDE_BAR_STATE.OPEN}
        onToggleSidebar={onToggleDesktopSidebar}
      />
      <div
        className={clsx(
          'flex flex-1 flex-col justify-between',
          toggleDesktopSidebar === SIDE_BAR_STATE.OPEN
            ? 'min-h-[calc(100vh-170px)]'
            : 'min-h-[calc(100vh-230px)]',
        )}
      >
        <NavigateList toggle={toggleDesktopSidebar} />
        <SidebarFooter toggle={toggleDesktopSidebar} onLogout={signOut} />
      </div>
    </div>
  </section>
);

export default memo(DesktopSidebar);
