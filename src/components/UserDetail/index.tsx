'use client';
import { memo } from 'react';

// Components
import { Text, Button, Image } from '@/components';

// Types
export interface UserDetailProps {
  onClick: () => void;
}

const UserDetail = ({ onClick }: UserDetailProps) => {
  // TODO: get currentUser here

  return (
    <div className="m-[50px_0_0] max-w-[500px] p-[50px_100px] flex flex-col items-center text-left gap-[5px_0] border-3 border-gray-100">
      <Image
        className="rounded-full"
        width={128}
        height={128}
        alt="User Avatar"
        src={''}
      />

      <Text className="m-[10px_0_0] font-medium" size="4xl" as="dd" text="" />

      <div className="m-[30px_0] grid grid-cols-2 gap-4">
        <Text className="font-medium" size="xl" as="dt" text="Role:" />
        <Text size="md" as="dd" text="" />

        <Text className="font-medium" size="xl" as="dt" text="User Name:" />
        <Text size="md" as="dd" text="" />

        <Text className="font-medium" size="xl" as="dt" text="Email:" />
        <Text size="md" as="dd" text="" />
      </div>

      <Button
        className="!w-full text-[15px] font-medium md:w-auto py-[10px] px-[25px] mt-10 md:mt-0"
        type="button"
        color="primary"
        onClick={onClick}
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default memo(UserDetail);
