import {
  Dropdown as NextUIDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from '@nextui-org/react';

// icons
import { RiEdit2Fill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import { FaEllipsisH } from 'react-icons/fa';

interface DropdownActionsProps {
  id?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DropdownActions = ({ id, onEdit, onDelete }: DropdownActionsProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id ?? '');
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id ?? '');
    }
  };

  return (
    <NextUIDropdown
      showArrow
      classNames={{
        base: 'bg-white dark:bg-[#1A202C] rounded-[15px]',
        content: ' py-2 px-2 border border-transparent bg-dark-800 shadow-lg',
      }}
    >
      <DropdownTrigger>
        <Button className="border-none bg-bone">
          <FaEllipsisH size={24} className="text-blue-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu">
        <DropdownSection>
          <DropdownItem
            key="edit"
            className="bg-[#f5f5fc] dark:bg-[#2f3268] py-3 text-[#605cf8]"
            startContent={
              <RiEdit2Fill className="text-blue-500 dark:text-purple-600 rounded-" />
            }
            onClick={handleEdit}
          >
            Edit
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="delete"
            className="bg-[#fff7fb] dark:bg-pink-600 py-3 text-pink-500"
            startContent={<AiFillDelete className="text-pink-500" />}
            onClick={handleDelete}
          >
            Delete
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </NextUIDropdown>
  );
};

export default DropdownActions;
