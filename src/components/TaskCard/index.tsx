'use client';

import { memo, useCallback, useState, useTransition } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import Drawer from 'react-modern-drawer';
import dynamic from 'next/dynamic';

// Types
import { StrapiModel, Task, TaskWithStringAssignees, Level } from '@/types';

// Components
import {
  LevelChip,
  DropdownActions,
  AvatarGroup,
  Text,
  ImageFallback,
  LoadingIndicator,
  TaskForm,
} from '@/components';

// Constants
import { MESSAGES } from '@/constants';

// Actions
import { deleteTask, getTaskDetails, updateTaskWithAssignees } from '@/actions';

// Hooks
import { useToast } from '@/hooks';

// Models
import { TUser } from '@/models';

// Apis
import { uploadImage } from '@/api/image';

// Utils
import { formatErrorMessage } from '@/utils';

const DynamicTaskDetails = dynamic(() => import('../TaskDetail'));

type TTaskCardProps = {
  index: number;
  task: StrapiModel<Task>;
};

const TaskCard = ({ index, task }: TTaskCardProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [taskByID, setTaskByID] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [taskForm, setTaskForm] = useState<TaskWithStringAssignees>();
  const [isPending, startTransition] = useTransition();
  const [idTask, setIdTask] = useState<number>();
  const [avatarFiles, setAvatarFiles] = useState<File[]>();
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);

  const { id, attributes } = task ?? {};
  const {
    title = '',
    level = Level.Low,
    assignees = { data: [] },
    images = [],
    description = '',
    label = 'todo',
  } = attributes ?? {};

  const handleDelete = useCallback(
    async (id: number) => {
      setIsLoading(true);

      const res = await deleteTask(id);

      setIsLoading(false);

      const { error } = res || {};

      showToast({
        description: error || MESSAGES.SUCCESS.DELETE_TASK,
        status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
      });
    },
    [showToast],
  );

  const handleEdit = async (id: number) => {
    if (attributes) {
      setIdTask(id);

      const taskWithStringAssignees: TaskWithStringAssignees = {
        ...attributes,
        assignees: attributes.assignees.data.map((assignee) => assignee.id),
      };

      setTaskForm(taskWithStringAssignees);
    }

    setIsDrawerOpen(true);
  };

  const renderImageTask = () => {
    const hasTwoImages = images?.length === 2;

    if (!images) return <></>;

    // If images exist and has exactly two items
    if (hasTwoImages)
      return (
        <div className="flex flex-row justify-between max-w-[235px] gap-[0_12px] xl:gap-[0_21px]">
          {images.map((image, indexImage) => (
            <div
              className="w-[107px] h-[90px] relative"
              key={`imageTask_${indexImage}`}
            >
              <ImageFallback
                fill
                alt={title}
                src={image}
                className="rounded-[10px] object-cover"
              />
            </div>
          ))}
        </div>
      );

    // If images exist and has exactly one item
    return (
      <div className="max-w-[235px] h-[176px] relative">
        <ImageFallback
          alt={title}
          src={images[0]}
          fill
          className="object-cover"
        />
      </div>
    );
  };

  const handleOpenModal = async () => {
    if (id) {
      const task = await getTaskDetails(id);
      setTaskByID(task);
    }

    if (taskByID) {
      setIsShowModal(true);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsShowModal(false);
  };

  const handleAvatarChange = useCallback((files: File[]) => {
    setAvatarFiles(files);
    setIsAvatarDirty(true);
  }, []);

  const handleCloseFormModal = () => {
    setIsDrawerOpen(false);
  };

  const handleFormSubmit = useCallback(
    async (formData: TaskWithStringAssignees) => {
      if (avatarFiles && isAvatarDirty) {
        try {
          const dirtyFiles = avatarFiles.filter(
            (file) => typeof file !== 'string',
          );

          const uploadImageResponses = await Promise.all(
            Array.from(dirtyFiles).map((file: File) => uploadImage(file)),
          );

          const downloadURLs: string[] = uploadImageResponses
            .map((response) => response?.downloadURL)
            .filter(Boolean) as string[];

          if (downloadURLs.length !== avatarFiles.length) {
            return;
          }

          downloadURLs.forEach((url: string) => formData.images?.push(url));
        } catch (error) {
          const message = formatErrorMessage(error);

          return { error: message };
        }
      }

      startTransition(async () => {
        if (idTask) {
          const { error } = await updateTaskWithAssignees(idTask, {
            ...formData,
            images: formData.images?.filter((image) => !image.includes('blob')),
          });

          if (error) {
            showToast({
              description: error,
              status: MESSAGES.STATUS.ERROR,
            });

            return;
          }

          showToast({
            description: MESSAGES.SUCCESS.UPDATE_TASK,
            status: MESSAGES.STATUS.SUCCESS,
          });
        }
      });
    },
    [avatarFiles, idTask, isAvatarDirty, showToast],
  );

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <Draggable draggableId={id.toString()} index={index}>
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`w-full bg-white dark:bg-gray-400 p-[20px] rounded-5 shadow-md ${
                snapshot.isDragging ? 'opacity-50' : ''
              }`}
              onClick={handleOpenModal}
            >
              <div className="flex flex-row items-center justify-between mb-[15px]">
                <Text className="text-md" text={title} />
                <DropdownActions
                  id={id}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  isIconOnly
                  disableAnimation
                  customClassName="w-[15px] min-w-[15px]"
                />
              </div>
              <LevelChip level={level} />
              <Text
                className="mt-[20px] text-sm text-justify"
                text={description}
              />

              {images?.length !== 0 && (
                <div className="mt-[20px]">{renderImageTask()}</div>
              )}

              <div className="mt-[20px]">
                <AvatarGroup users={assignees.data} />
              </div>
            </div>
            {taskByID && (
              <DynamicTaskDetails
                title={title}
                level={level}
                description={description}
                assignees={assignees}
                renderImages={renderImageTask}
                label={label}
                isOpen={isShowModal}
                onCloseModal={handleCloseDetailsModal}
                imageCount={images?.length}
              />
            )}
            {taskForm && isDrawerOpen && (
              <Drawer
                open={isDrawerOpen}
                onClose={handleCloseFormModal}
                direction="right"
                size={400}
                className="!w-full md:!w-[450px]"
              >
                <div className="p-8 bg-white dark:bg-gray-400 h-full max-w-full overflow-y-auto">
                  <TaskForm
                    previewData={taskForm}
                    onAvatarChange={handleAvatarChange}
                    user={{} as TUser}
                    isDisabledField={isPending}
                    onCloseDrawer={handleCloseFormModal}
                    onSubmit={handleFormSubmit}
                    setReset={() => {}}
                  />
                </div>
              </Drawer>
            )}
          </>
        )}
      </Draggable>
    </>
  );
};

export default memo(TaskCard);
