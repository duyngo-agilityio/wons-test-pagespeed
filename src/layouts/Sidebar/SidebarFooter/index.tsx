'use client';

import { memo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

// Constants
import {
  MESSAGE_STATUS,
  ROUTES,
  SIDE_BAR_STATE,
  SUCCESS_MESSAGES,
} from '@/constants';

// Hooks
import { useToast } from '@/hooks';

// Components
import { Button, Image, IoLogOut, Text } from '@/components';
const DynamicThemeSwitcher = dynamic(
  () => import('@/components/ThemeSwitcher'),
  {
    ssr: false,
  },
);

interface ISidebarFooter {
  toggle?: string;
  onLogout: () => Promise<void>;
}

const SidebarFooter = ({
  toggle = SIDE_BAR_STATE.OPEN,
  onLogout,
}: ISidebarFooter) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleSignOut = () => {
    startTransition(async () => {
      // TODO: Update confirm modal later..
      const res = await onLogout();

      if (typeof res === 'string') {
        return showToast({
          status: 'error',
          title: MESSAGE_STATUS.ERROR,
          description: res,
        });
      }

      showToast({
        title: MESSAGE_STATUS.SUCCESS,
        description: SUCCESS_MESSAGES.SIGN_OUT,
      });

      router.push(ROUTES.SIGN_IN);
    });
  };

  return (
    <section className="flex flex-col gap-7.5">
      <DynamicThemeSwitcher />
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
          isLoading={isPending}
          isIconOnly
          className="!bg-transparent dark:!bg-transparent hover:bg-transparent w-fit h-fit p-2"
          onClick={handleSignOut}
        >
          <IoLogOut className="text-blue-800/40 dark:text-white/50 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default memo(SidebarFooter);
