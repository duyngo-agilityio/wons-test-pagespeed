import { Modal as NextModal, ModalContent } from '@nextui-org/react';

// Components
import { Input } from '@/components';

interface DateTimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const DateTimePickerModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedStartTime,
  selectedEndTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: DateTimePickerModalProps) => {
  return (
    <NextModal isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent className="p-6">
        <div className="mb-4">
          <Input
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Time"
            type="time"
            value={selectedStartTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
          />
          <Input
            label="End Time"
            type="time"
            value={selectedEndTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </ModalContent>
    </NextModal>
  );
};

export default DateTimePickerModal;
