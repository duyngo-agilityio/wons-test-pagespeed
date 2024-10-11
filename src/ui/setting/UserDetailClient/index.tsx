'use client';
import { memo, useState, useCallback, useTransition } from 'react';
import isEqual from 'react-fast-compare';

// Constants
import { IMAGES, ROLES, SUCCESS_MESSAGES, MESSAGE_STATUS } from '@/constants';

// Actions
// import { updateUser } from '@/actions';

// APIs
// import { uploadImage } from '@/api/image';

// Hooks
import { useToast } from '@/hooks';

// Utils
import { handleUpdateImageProfile } from '@/utils';

// Components
import { UserDetailForm, UserDetail, LoadingIndicator } from '@/components';

// Types
import { TUser } from '@/models';
import { UserProfileData } from '@/types';

interface UserDetailClientProps {
  user?: TUser;
  onEdit: (
    payload: Partial<UserProfileData>,
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
    id = '',
    avatar = IMAGES.AVATAR_DEFAULT,
    fullName = '',
    username = '',
    email = '',
    role = ROLES[0],
  } = user ?? {};

  const handleEditFormToggle = () => {
    setShowEditForm((prevValue) => !prevValue);
  };

  const handleAvatarChange = useCallback((avatarFile: File) => {
    setAvatarFile(avatarFile);
    setIsAvatarDirty(true);
  }, []);

  const handleEditUserDetail = useCallback(
    async (formData: Partial<UserProfileData>, id: string) => {
      setIsLoading(true);

      if (avatarFile && isAvatarDirty) {
        formData = (await handleUpdateImageProfile(
          avatarFile,
          formData,
        )) as UserProfileData;
      }

      startTransition(async () => {
        const { error } = await onEdit(formData, Number(id));

        if (error) {
          return showToast({
            description: error,
            status: MESSAGE_STATUS.ERROR,
          });
        } else {
          showToast({
            description: SUCCESS_MESSAGES.UPDATE_PRODUCT,
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
    [avatarFile, isAvatarDirty, isPending, onEdit, showToast],
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
              id={id}
              imageUrl={avatar}
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

export default memo(UserDetailClient, isEqual);
