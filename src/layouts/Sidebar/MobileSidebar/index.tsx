import { memo } from 'react';
import clsx from 'clsx';

// Actions
import { signOut } from '@/actions';

// Components
import NavigateList from '@/layouts/Sidebar/NavigateList';
import SidebarFooter from '@/layouts/Sidebar/SidebarFooter';
import SidebarHeader from '@/layouts/Sidebar/SidebarHeader';

interface IMobileSidebar {
  isToggleMobileSidebar: boolean;
  avatar: string;
  fullName: string;
  role: string;
  onOutsideClick: () => void;
  onToggleSidebar: () => void;
}

const MobileSidebar = ({
  isToggleMobileSidebar,
  avatar,
  fullName,
  role,
  onOutsideClick,
  onToggleSidebar,
}: IMobileSidebar) => {
  return (
    <>
      {isToggleMobileSidebar && (
        <button
          className="bg-black/50 w-screen h-screen fixed z-40"
          onClick={onOutsideClick}
        />
      )}
      <section
        className={clsx(
          'fixed top-0 duration-700 z-50',
          isToggleMobileSidebar ? 'left-0' : '-left-60',
        )}
      >
        <div className="z-50 bg-white dark:bg-gray-400 px-6.25 py-7.5 flex flex-col transition-all max-w-60 min-h-screen">
          <SidebarHeader
            isToggle={isToggleMobileSidebar}
            onToggleSidebar={onToggleSidebar}
          />
          <div className="flex flex-col justify-between min-h-[calc(100vh-170px)]">
            <NavigateList />
            <SidebarFooter
              onLogout={signOut}
              avatar={avatar}
              fullName={fullName}
              role={role}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(MobileSidebar);
