import { memo } from 'react';
import clsx from 'clsx';

// Constants
import { SIDE_BAR_STATE } from '@/constants';

// Components
import { Button, Image, IoLogOut, Text } from '@/components/common';

interface ISidebarFooter {
  toggle?: string;
  onLogout?: () => void;
}

const SidebarFooter = ({
  toggle = SIDE_BAR_STATE.OPEN,
  onLogout,
}: ISidebarFooter) => (
  <div
    className={clsx(
      'flex',
      toggle === SIDE_BAR_STATE.OPEN ? 'justify-between' : 'flex-col gap-3',
    )}
  >
    <div className="flex items-center gap-2.5">
      <Image
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        alt="admin"
        width={40}
        height={40}
        className="rounded-10"
      />
      {toggle === SIDE_BAR_STATE.OPEN && (
        <div>
          <Text text="Easin Arafat" className="text-sm" />
          <Text text="Admin" className="text-xs opacity-50" />
        </div>
      )}
    </div>
    <Button
      isIconOnly
      className="bg-transparent hover:bg-transparent w-fit h-fit p-2"
      onClick={onLogout}
    >
      <IoLogOut className="text-blue-800/40 w-5 h-5" />
    </Button>
  </div>
);

export default memo(SidebarFooter);
