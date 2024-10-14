'use client';
import { memo, useState, useCallback, useTransition } from 'react';

// Constants
import { IMAGES, ROLES, SUCCESS_MESSAGES, MESSAGE_STATUS } from '@/constants';

// Hooks
import { useToast } from '@/hooks';

// Utils
import { handleUpdateImageProfile } from '@/utils';

// Components
import { UserDetailForm, UserDetail, LoadingIndicator } from '@/components';

// Types
import { TUser } from '@/models';
import { IUserFormData } from '@/types';

interface UserDetailClientProps {
  user?: TUser;
  onEdit: (
    payload: Omit<IUserFormData, 'role'>,
    id: number,
  ) => Promise<
    | {
        success: boolean;
        error: undefined;
      }
    | {
        error: string;
        success: undefined;
      }
  >;
}

const UserDetailClient = ({ user, onEdit }: UserDetailClientProps) => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { showToast } = useToast();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    avatar = IMAGES.AVATAR_DEFAULT,
    fullName = '',
    username = '',
    email = '',
    role = ROLES[0],
  } = user ?? {};

  const handleEditFormToggle = () => {
    setShowEditForm((prevValue) => !prevValue);
  };

  const handleAvatarChange = useCallback((file: File) => {
    setAvatarFile(file);
    setIsAvatarDirty(true);
  }, []);

  const handleEditUserDetail = useCallback(
    // Update User's avatar
    async (formData: IUserFormData) => {
      setIsLoading(true);

      if (avatarFile && isAvatarDirty) {
        formData = (await handleUpdateImageProfile(
          avatarFile,
          formData,
        )) as IUserFormData;
      }

      // Update user's profile
      startTransition(async () => {
        const { error } = await onEdit(
          {
            avatar: formData.avatar,
            fullName: formData.fullName,
            email: formData.email,
            username: formData.username,
          },
          Number(user?.id),
        );

        if (error) {
          return showToast({
            description: error,
            status: MESSAGE_STATUS.ERROR,
          });
        } else {
          showToast({
            description: SUCCESS_MESSAGES.UPDATE_PROFILE,
            status: MESSAGE_STATUS.SUCCESS,
          });
        }
      });

      if (!isPending) {
        setAvatarFile(undefined);
        setIsAvatarDirty(false);
      }

      setIsLoading(false);
    },
    [avatarFile, isAvatarDirty, isPending, onEdit, showToast, user?.id],
  );

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="flex flex-col justify-center items-center pb-[60px] bg-white dark:bg-gray-800 rounded-lg">
          <div className="bg-blue-500 w-full h-20 rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-blue-500 to-blue-300" />
          {showEditForm ? (
            <UserDetailForm
              avatar={avatar}
              username={username}
              role={role.name}
              fullName={fullName}
              email={email}
              onAvatarChange={handleAvatarChange}
              onSubmit={handleEditUserDetail}
              onCancel={handleEditFormToggle}
            />
          ) : (
            <UserDetail
              imageUrl={avatar}
              username={username}
              role={role.name}
              fullName={fullName}
              email={email}
              onClick={handleEditFormToggle}
            />
          )}
        </div>
      )}
    </>
  );
};

export default memo(UserDetailClient);
