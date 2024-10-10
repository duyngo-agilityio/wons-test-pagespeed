'use client';
import { memo } from 'react';

// Components
import { Text, Button, ImageFallback } from '@/components';

// Types
interface UserDetailProps {
  avatar: string;
  username: string;
  role: string;
  fullName: string;
  email: string;
  onClick: () => void;
}

const UserDetail = ({
  avatar,
  username,
  role,
  fullName,
  email,
  onClick,
}: UserDetailProps) => {
  return (
    <div className="p-[0_30px_0] w-full gap-[5px_0]">
      <div className="m-[30px_0] flex justify-between items-center">
        <div className="flex gap-[0_20px]">
          <ImageFallback
            className="rounded-full"
            width={128}
            height={128}
            alt="User Avatar"
            src={avatar}
          />

          <div className="flex flex-col justify-center">
            <Text className="font-bold" size="2xl" as="dd" text={fullName} />
            <Text size="md" as="dd" text={role} />
          </div>
        </div>

        <Button
          className="h-fit text-[15px] font-medium md:w-auto py-[10px] px-[25px] mt-10 md:mt-0"
          type="button"
          color="primary"
          onClick={onClick}
        >
          Edit Profile
        </Button>
      </div>

      <dl className="flex flex-col gap-[5px_0] p-[15px_0] border-solid border-b-1 border-gray-100">
        <Text className="font-medium" size="xl" as="dt" text="User Name" />
        <Text className="text-black/60" size="md" as="dd" text={username} />
      </dl>

      <dl className="flex flex-col gap-[5px_0] p-[15px_0] border-solid border-b-1 border-gray-100">
        <Text className="font-medium" size="xl" as="dt" text="Email" />
        <Text className="text-black/60" size="md" as="dd" text={email} />
      </dl>
    </div>
  );
};

export default memo(UserDetail);
