import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_ASSIGNEES_WITH_STRAPI_MODEL, MOCK_IMAGES } from '@/mocks';

// Components
import TaskDetail from './index';
import { Button, ImageFallback } from '../common';

// Types
import { Level } from '@/types';

const meta: Meta<typeof TaskDetail> = {
  title: 'Components/TaskDetail',
  component: TaskDetail,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof TaskDetail>;

const renderImageTask = () => {
  const hasTwoImages = MOCK_IMAGES?.length === 2;

  if (!MOCK_IMAGES) return <></>;

  // If images exist and has exactly two items
  if (hasTwoImages)
    return (
      <div className="flex flex-row justify-between max-w-[235px] gap-[0_12px] xl:gap-[0_21px]">
        {MOCK_IMAGES.map((image, indexImage) => (
          <div
            className="w-[107px] h-[90px] relative"
            key={`imageTask_${indexImage}`}
          >
            <ImageFallback
              fill
              alt="Image"
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
        alt="Image"
        src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
        fill
        className="object-cover"
      />
    </div>
  );
};

const BasicUsage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="mt-4"
        color="primary"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Open modal
      </Button>

      <TaskDetail
        title="Dashboard Design"
        level={Level.Low}
        description="Discussion for management dashboard ui design"
        assignees={{
          data: MOCK_ASSIGNEES_WITH_STRAPI_MODEL,
        }}
        renderImages={renderImageTask}
        label="todo"
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        imageCount={1}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <BasicUsage />,
};
