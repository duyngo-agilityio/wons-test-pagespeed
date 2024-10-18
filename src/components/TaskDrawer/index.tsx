'use client';

import { memo, useCallback, useState, useTransition } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// Models
import { TUser } from '@/models';

// components
import { BsPlus, Button, TaskForm } from '@/components';

// types
import { TaskWithStringAssignees } from '@/types';

// hooks
import { useToast } from '@/hooks';

// actions
import { createTask } from '@/actions';

// constants
import { MESSAGE_STATUS, SUCCESS_MESSAGES } from '@/constants';

// api
import { uploadImage } from '@/api/image';

// utils
import { formatErrorMessage } from '@/utils';

interface TaskDrawerProps {
  user: TUser;
}

const TaskDrawer = ({ user }: TaskDrawerProps): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [avatarFiles, setAvatarFiles] = useState<File[]>([]);
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // TODO: handle later const handleFormSubmit = useCallback(
  const handleFormSubmit = useCallback(
    async (formData: TaskWithStringAssignees) => {
      if (avatarFiles && avatarFiles.length && isAvatarDirty) {
        try {
          const uploadImageResponses = await Promise.all(
            avatarFiles.map((file) => uploadImage(file)),
          );

          const downloadURLs = uploadImageResponses
            .map((response) => response?.downloadURL)
            .filter(Boolean);

          if (downloadURLs.length !== avatarFiles.length) {
            return;
          }

          formData.images = downloadURLs as string[];
        } catch (error) {
          const message = formatErrorMessage(error);
          return { error: message };
        }
      }

      startTransition(async () => {
        const { title, ...restFormData } = formData;
        const { error } = await createTask({
          title,
          ...restFormData,
        });

        if (error) {
          showToast({
            description: error,
            status: MESSAGE_STATUS.ERROR,
          });
        } else {
          showToast({
            description: SUCCESS_MESSAGES.CREATE_TASK,
            status: MESSAGE_STATUS.SUCCESS,
          });
        }
      });

      if (!isPending) {
        setIsDrawerOpen(false);
        setAvatarFiles([]);
      }
    },
    [avatarFiles, isAvatarDirty, isPending, showToast],
  );

  const handleAvatarChange = useCallback((files: File[]) => {
    setAvatarFiles(files);
    setIsAvatarDirty(true);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center w-full md:w-fit">
      <Button
        startContent={<BsPlus size={22} className="text-white" />}
        color="primary"
        className="base:w-full md:w-[122px] h-10 base:gap-2 md:gap-0.5"
        onClick={handleOpenDrawer}
      >
        Add New Task
      </Button>
      {isDrawerOpen && (
        <div>
          <Drawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            direction="right"
            size={400}
            className="!w-full md:!w-[450px]"
          >
            <div className="p-8 bg-white dark:bg-gray-400 h-full max-w-full overflow-y-auto">
              <TaskForm
                onAvatarChange={handleAvatarChange}
                user={user}
                onCloseDrawer={handleCloseDrawer}
                key={isDrawerOpen ? 'open' : 'closed'}
                onSubmit={handleFormSubmit}
                setReset={() => {}}
              />
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default memo(TaskDrawer);
