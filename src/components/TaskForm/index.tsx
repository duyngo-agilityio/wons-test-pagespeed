'use client';

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

// libs
import { Select, SelectItem, Textarea } from '@nextui-org/react';
import { Controller, useForm, UseFormReset } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

// Constants
import { LEVELS, ERROR_MESSAGES, Level, STATUS } from '@/constants';

// Utils
import {
  clearErrorOnChange,
  getDirtyState,
  isEnableSubmitButton,
  parseStringToNumberArray,
} from '@/utils';

// Components
import { Button, Heading, Input, AvatarUploadMultiple } from '@/components';

// Models
import { TaskWithStringAssignees } from '@/types';

// icons
import { GrPrevious } from 'react-icons/gr';

// models
import { TUser } from '@/models';

// apis
import { getUsers } from '@/api';
import isEqual from 'react-fast-compare';

// Zod schema for validation
const taskFormSchema = z.object({
  title: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED),
  label: z.enum(['todo', 'inProgress', 'inReview', 'done'], {
    errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
  }),
  level: z.enum(['Low', 'Medium', 'High'], {
    errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
  }),
  assignees: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED),
  description: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED)
    .max(10000, ERROR_MESSAGES.FIELD_INVALID('Description')),
});

const REQUIRED_FIELDS = ['title', 'label', 'level', 'description', 'assignees'];
export interface ITaskFormProps {
  isDisabledField?: boolean;
  onSubmit: (data: TaskWithStringAssignees) => void;
  setReset: (reset: UseFormReset<Partial<TaskWithStringAssignees>>) => void;
  previewData?: TaskWithStringAssignees | null;
  onCloseDrawer?: () => void;
  onAvatarChange: (files: File[]) => void;
  user: TUser;
}
const TaskForm = ({
  isDisabledField = false,
  onSubmit,
  setReset,
  previewData = null,
  onCloseDrawer,
  user,
  onAvatarChange,
}: ITaskFormProps) => {
  const {
    control,
    formState: { dirtyFields, errors, defaultValues },
    clearErrors,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<Partial<TaskWithStringAssignees>>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: previewData || {
      title: '',
      label: undefined,
      level: Level.MEDIUM,
      description: '',
      assignees: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (setReset) {
      setReset(reset);
    }
  }, [setReset, reset]);

  const isAssigneesValid = (assignees: string | undefined): boolean => {
    if (!assignees || assignees.trim() === '' || assignees.trim() === ',') {
      return false;
    }
    return true;
  };

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const requiredField = REQUIRED_FIELDS.filter((field) => field !== 'images');

  const allFieldsFilled = requiredField.every((field) => {
    const isDirty = dirtyItems.includes(field);
    const hasError = errors[field as keyof Partial<TaskWithStringAssignees>];
    return isDirty && !hasError;
  });

  const isDisableSubmit = previewData
    ? !(enableSubmit || !getDirtyState(defaultValues ?? {}, watch()))
    : !allFieldsFilled ||
      !isAssigneesValid(watch('assignees') as string | undefined);

  const saveData = useCallback(
    async (formData: Partial<TaskWithStringAssignees>) => {
      const assignees = formData.assignees
        ? parseStringToNumberArray(formData.assignees as string)
        : [];
      startTransition(async () => {
        const dataToSubmit: TaskWithStringAssignees = {
          assignees,
          images: formData.images ?? [],
          title: formData.title || '',
          label: formData.label || 'todo',
          level: formData.level || Level.MEDIUM,
          description: formData.description || '',
        };
        await onSubmit(dataToSubmit);
        reset();
      });
    },
    [onSubmit, reset],
  );

  const [users, setUsers] = useState<TUser[]>([]);

  const handleGetUserList = useCallback(async () => {
    try {
      const response = await getUsers();
      if (response) {
        setUsers(response);
      }
    } catch (error) {
      return;
    }
  }, []);

  useEffect(() => {
    handleGetUserList();
  }, [handleGetUserList]);

  const usersOptions = users
    .filter((userAssign) => userAssign.id.toString() !== user?.id?.toString())
    .map((user) => ({
      label: user.username,
      key: user.id,
    }));

  return (
    <form
      className="w-full max-w-2xl mx-auto mt-20"
      onSubmit={handleSubmit(saveData)}
    >
      <div className="flex items-center gap-5">
        <Button
          onClick={onCloseDrawer}
          className="!bg-transparent dark:!bg-transparent text-gray-200 dark:text-gray-300 hover:!bg-transparent dark:hover:!bg-transparent"
        >
          <GrPrevious size={20} />
        </Button>
        <Heading
          title={previewData ? 'Update Task' : 'Add a New Task'}
          className="text-center"
        />
      </div>

      <div className="flex justify-center mt-[21px]">
        <Controller
          control={control}
          name="images"
          render={({ field: { value }, fieldState: { error } }) => (
            <AvatarUploadMultiple
              value={Array.isArray(value) ? value : []}
              error={error?.message}
              onFileChange={(files) => {
                const currentFileURLs = Array.isArray(value) ? value : [];

                const combinedFileURLs = [...currentFileURLs, ...files];

                const stringURLs = combinedFileURLs.filter(
                  (file): file is string => typeof file === 'string',
                );
                setValue('images', stringURLs);
                onAvatarChange(files);
              }}
            />
          )}
        />
      </div>

      <div className="mt-5">
        <Controller
          name="title"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <div className="flex flex-col w-full h-[71px] mb-5">
              <Input
                label="Task Name"
                isInvalid={!!error}
                errorMessage={error?.message}
                isDisabled={isDisabledField}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
            </div>
          )}
        />

        <Controller
          name="label"
          control={control}
          render={({
            field: { name, onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <div className="flex flex-col w-full h-[71px] mb-12">
              <Select
                name={name}
                id="label"
                defaultSelectedKeys={[value as string]}
                labelPlacement="outside"
                onClose={onBlur}
                placeholder=" "
                label="Label"
                className={clsx('w-full rounded-md', {
                  'border-red-500': error,
                  'border-gray-300': !error,
                })}
                classNames={{
                  trigger: clsx(
                    'w-full py-[26px] mt-5',
                    error
                      ? 'bg-danger-50 hover:!bg-danger-200/50 focus:!bg-danger-200/50 dark:hover:!bg-gray-600'
                      : 'bg-gray-50 dark:bg-gray-600 hover:!bg-gray-200/50 dark:hover:!bg-gray-900 focus:bg-gray-50 dark:focus:bg-gray-600',
                  ),
                  label: 'text-xl font-medium pb-1',
                }}
                isDisabled={isDisabledField}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrorOnChange(name, errors, clearErrors);
                }}
              >
                {STATUS.map((status) => (
                  <SelectItem key={status.key} value={status.key}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="level"
          control={control}
          render={({
            field: { name, onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <div className="flex flex-col w-full h-[71px] mb-16">
              <Select
                name={name}
                id="level"
                defaultSelectedKeys={[value as string]}
                labelPlacement="outside"
                onClose={onBlur}
                placeholder=" "
                label="Priority Level"
                className={clsx('w-full rounded-md', {
                  'border-red-500': error,
                  'border-gray-300': !error,
                })}
                classNames={{
                  trigger: clsx(
                    'w-full py-[26px] mt-5',
                    error
                      ? 'bg-danger-50 hover:!bg-danger-200/50 focus:!bg-danger-200/50 dark:hover:!bg-gray-600'
                      : 'bg-gray-50 dark:bg-gray-600 hover:!bg-gray-200/50 dark:hover:!bg-gray-900 focus:bg-gray-50 dark:focus:bg-gray-600',
                  ),
                  label: 'text-xl font-medium pb-1',
                }}
                isDisabled={isDisabledField}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrorOnChange(name, errors, clearErrors);
                }}
              >
                {LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </Select>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </div>
          )}
        />

        <div className="flex flex-col">
          <label className="text-xl font-medium pb-2">Description</label>
          <Controller
            name="description"
            control={control}
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Textarea
                classNames={{
                  input: clsx('!text-blue-800/70 dark:!text-white/70'),
                  inputWrapper: clsx(
                    'bg-gray-50 dark:bg-gray-600',
                    'hover:!bg-gray-200/50 dark:hover:!bg-gray-900',
                    'focus-within:!bg-gray-50 dark:focus-within:bg-gray-600',
                    'group-data-[focus=true]:!bg-gray-50 dark:group-data-[focus=true]:!bg-gray-600',
                  ),
                }}
                isInvalid={!!error}
                errorMessage={error?.message}
                isDisabled={isDisabledField}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
            )}
          />
        </div>

        <Controller
          name="assignees"
          control={control}
          render={({
            field: { onChange, value, name, onBlur },
            fieldState: { error },
          }) => (
            <Select
              selectionMode="multiple"
              label="Assignees"
              defaultSelectedKeys={value}
              placeholder=" "
              onClose={onBlur}
              labelPlacement="outside"
              variant="flat"
              isDisabled={isDisabledField}
              classNames={{
                trigger:
                  'w-full bg-gray-50 dark:bg-gray-600 hover:!bg-gray-200/50 dark:hover:!bg-gray-900 focus:bg-gray-50 dark:focus:bg-gray-600 py-[26px] mt-5',
                label: 'text-xl font-medium pb-1',
              }}
              onChange={(e) => {
                onChange(e.target.value);
                clearErrorOnChange(name, errors, clearErrors);
              }}
              isInvalid={!!error}
              errorMessage={error?.message}
            >
              {usersOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <Button
        type="submit"
        isLoading={isPending}
        isDisabled={isDisableSubmit || isPending}
        size="lg"
        color="primary"
        className="w-full mt-8 text-xl font-medium cursor-pointer"
      >
        Save Task
      </Button>
    </form>
  );
};
export default memo(TaskForm, isEqual) as <T>(
  props: ITaskFormProps & T,
) => JSX.Element;
