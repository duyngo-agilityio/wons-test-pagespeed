'use client';

import { memo } from 'react';

import {
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

// components
import { Button } from '@/components';

interface ConfirmModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmModal = ({
  title,
  isOpen,
  content,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const handleSubmit = (onClose: () => void) => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = (onClose: () => void) => {
    onCancel?.();
    onClose();
  };

  return (
    <NextUIModal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onCancel}
      radius="lg"
      classNames={{
        body: 'py-6',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-[#292f46] bg-white text-black dark:bg-gray-400 dark:text-white',
        closeButton: 'hover:bg-white/5 active:bg-white/10',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center !text-xxl font-bold text-blue-800/70 dark:text-white/70">
              {title}
            </ModalHeader>

            <ModalBody className="pt-4 text-center !text-xl text-blue-800/70 dark:text-white/70">
              <p className="text-lg">{content}</p>
            </ModalBody>

            <ModalFooter className="flex justify-center gap-4">
              <Button
                className="flex-1 !bg-blue-500 dark:!bg-blue-500 text-white/70 hover:!bg-blue-200 dark:hover:!bg-blue-200 px-6 py-2 !rounded-10 shadow-md"
                onPress={() => handleSubmit(onClose)}
              >
                Submit
              </Button>

              <Button
                className="flex-1 !bg-white dark:!bg-white !text-blue-800/70 dark:text-white/70 border border-gray-300 hover:bg-gray-100 dark:hover:!bg-gray-300 px-6 py-2 !rounded-10"
                onPress={() => handleCancel(onClose)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </NextUIModal>
  );
};

export default memo(ConfirmModal);
