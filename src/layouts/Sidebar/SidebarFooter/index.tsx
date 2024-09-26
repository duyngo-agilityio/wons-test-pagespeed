'use client';

import { memo, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

// Constants
import { MESSAGE_STATUS, ROUTES, SIDE_BAR_STATE } from '@/constants';

// Hooks
import { useToast } from '@/hooks';

// Components
import {
  Button,
  ConfirmModal,
  Image,
  IoLogOut,
  LoadingIndicator,
  Text,
} from '@/components';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { showToast } = useToast();

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

  const handleCancelDelete = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    setIsModalOpen(false);
    setIsPending(true);

    const res = await onLogout();

    if (typeof res === 'string') {
      return showToast({
        status: 'error',
        title: MESSAGE_STATUS.ERROR,
        description: res,
      });
    }

    router.push(ROUTES.SIGN_IN);

    setIsPending(false);
  }, [router, showToast]);

  return (
    <>
      {isPending && <LoadingIndicator />}
      <section className="flex flex-col gap-7.5">
        <DynamicThemeSwitcher />
        <div
          className={clsx(
            'flex',
            toggle === SIDE_BAR_STATE.OPEN
              ? 'justify-between'
              : 'flex-col gap-3',
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
            className="!bg-transparent dark:!bg-transparent hover:bg-transparent w-fit h-fit p-2"
            onClick={handleOpenModal}
          >
            <IoLogOut className="text-blue-800/40 dark:text-white/50 w-5 h-5" />
          </Button>
        </div>
      </section>
      <ConfirmModal
        title="Sign out"
        content="Are you sure you would like to Sign out?"
        isOpen={isModalOpen}
        onConfirm={handleSignOut}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default memo(SidebarFooter);
