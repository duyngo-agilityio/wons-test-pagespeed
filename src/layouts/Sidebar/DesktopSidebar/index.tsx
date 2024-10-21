import { memo } from 'react';
import clsx from 'clsx';

// Actions
import { signOut } from '@/actions';

// Components
import NavigateList from '@/layouts/Sidebar/NavigateList';
import SidebarFooter from '@/layouts/Sidebar/SidebarFooter';
import SidebarHeader from '@/layouts/Sidebar/SidebarHeader';

// Types
import { Role, SidebarState } from '@/types';

interface IDesktopSidebar {
  toggleDesktopSidebar: string;
  avatar: string;
  fullName: string;
  role: Role;
  onToggleDesktopSidebar: () => void;
}

const DesktopSidebar = ({
  toggleDesktopSidebar,
  avatar,
  fullName,
  role,
  onToggleDesktopSidebar,
}: IDesktopSidebar) => (
  <section
    className={clsx(
      'relative',
      toggleDesktopSidebar === SidebarState.Open ? 'left-0' : 'm-7.5',
    )}
  >
    <div
      className={clsx(
        'bg-white dark:bg-gray-400 px-6.25 py-7.5 flex flex-col min-h-full',
        toggleDesktopSidebar === SidebarState.Open
          ? 'max-w-60 duration-700'
          : 'max-w-20 items-center rounded-10',
      )}
    >
      <SidebarHeader
        isToggle={toggleDesktopSidebar === SidebarState.Open}
        onToggleSidebar={onToggleDesktopSidebar}
      />
      <div
        className={clsx(
          'flex flex-1 flex-col justify-between',
          toggleDesktopSidebar === SidebarState.Open
            ? 'min-h-[calc(100vh-170px)]'
            : 'min-h-[calc(100vh-230px)]',
        )}
      >
        <NavigateList toggle={toggleDesktopSidebar} />
        <SidebarFooter
          toggle={toggleDesktopSidebar}
          onLogout={signOut}
          avatar={avatar}
          fullName={fullName}
          role={role}
        />
      </div>
    </div>
  </section>
);

export default memo(DesktopSidebar);
