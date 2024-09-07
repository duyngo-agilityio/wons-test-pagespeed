import { memo } from 'react';
import clsx from 'clsx';

// Constants
import { IMAGE_SRC } from '@/constants';

// Components
import { Button, FaChevronLeft, Heading, Image } from '@/components/common';

interface ISidebarHeader {
  isToggle: boolean;
  onToggleSidebar: () => void;
}

const SidebarHeader = ({ isToggle, onToggleSidebar }: ISidebarHeader) => (
  <div>
    <Button
      isIconOnly
      color="primary"
      className={clsx(
        'absolute px-0.5 py-2 rounded-r-none',
        isToggle ? 'right-0' : '-right-5 rotate-180',
      )}
      onClick={onToggleSidebar}
    >
      <FaChevronLeft />
    </Button>
    <div className="w-full flex flex-col items-center mb-12.5">
      <Image
        priority
        src={IMAGE_SRC.LOGO}
        placeholder="empty"
        alt="wons-logo"
        width={42}
        height={26}
      />
      <Heading
        as="h2"
        title="Wons"
        className={clsx(
          'font-medium',
          isToggle ? 'text-[24px]' : 'text-[23px]',
        )}
      />
    </div>
  </div>
);

export default memo(SidebarHeader);
