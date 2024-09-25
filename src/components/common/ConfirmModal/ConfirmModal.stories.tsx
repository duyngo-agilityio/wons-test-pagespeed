import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// components
import { ConfirmModal, Button } from '@/components';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/Common/ModalConfirm',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    content: {
      control: {
        type: 'text',
      },
    },
    onConfirm: {
      action: 'onConfirm',
    },
    onCancel: {
      action: 'onCancel',
    },
    isOpen: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    return (
      <>
        <Button onClick={handleOpenModal}>Open Modal</Button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onCancel={handleCloseModal}
          onConfirm={() => {
            if (args.onConfirm) {
              args.onConfirm();
            }
            handleCloseModal();
          }}
        />
      </>
    );
  },
  args: {
    title: 'Delete Item',
    content: 'Are you sure you want to delete this item?',
    onConfirm: () => {},
    onCancel: () => {},
  },
};
