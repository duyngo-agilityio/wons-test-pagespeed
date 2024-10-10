'use client';

import { UseFormReset } from 'react-hook-form';
import { useCallback, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// Models
import { TUser } from '@/models';

// components
import { BsPlus, Button, TaskForm } from '@/components';

// types
import { TaskWithStringAssignees } from '@/types';

interface TaskDrawerProps {
  user: TUser;
}

const TaskDrawer = ({ user }: TaskDrawerProps): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  let formReset: UseFormReset<Partial<TaskWithStringAssignees>> | null = null;

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = () => {
    if (formReset) {
      formReset();
    }
    setIsDrawerOpen(false);
  };

  // TODO: handle later
  const handleFormSubmit = () => {};

  // TODO: handle later
  const handleAvatarChange = () => {};

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
              setReset={(
                resetFn: UseFormReset<Partial<TaskWithStringAssignees>> | null,
              ): void => {
                formReset = resetFn;
              }}
            />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default TaskDrawer;
