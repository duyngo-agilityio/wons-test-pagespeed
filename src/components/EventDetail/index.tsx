'use client';

import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Modal as NextModal, ModalContent } from '@nextui-org/react';

// components
import {
  Button,
  ImageFallback,
  Text,
  Heading,
  FaLocationDot,
} from '@/components';

// icons
import { FaUsers } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';

// Constants
import { IMAGES } from '@/constants';

export interface Guest {
  name: string;
  avatar: string;
}

export interface EventCardProps {
  title: string;
  time: string;
  location: string;
  guests?: Guest[];
  link?: string;
  isOpen: boolean;
  onCloseModal: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  id: number;
}

const EventDetail = ({
  title,
  time,
  location,
  guests = [],
  link = '',
  isOpen,
  onCloseModal,
  onEdit,
  onDelete,
  id,
}: EventCardProps) => {
  const handleJoinGoogleMeet = () => {
    // TODO: will handle again later
    window.open('https://meet.google.com/', '_blank');
  };

  const handleEdit = () => {
    onEdit?.(id);
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  return (
    <NextModal
      className="!max-w-[467px]"
      isOpen={isOpen}
      onOpenChange={onCloseModal}
    >
      <ModalContent className="relative top-0 left-0 p-[30px_30px_40px] bg-white dark:bg-gray-800 rounded-[10px] shadow-[ -14px_30px_20px_0px_rgba(0,0,0,0.05)] w-[467px]">
        <>
          <div className="p-4">
            <div className="mb-8">
              <Heading title={title} className="mb-2" />
              <Text
                size="2xl"
                className="opacity-70 font-medium uppercase"
                text={time}
              />
            </div>
            <div className="flex items-center mt-4">
              <FaLocationDot
                className="text-blue-800/30 dark:text-white/30"
                fontSize={16}
              />
              <Text
                as="span"
                text={location}
                size="xl"
                className="opacity-70 font-medium ml-4"
              />
            </div>

            <div className="flex flex-col items-start mt-4">
              <div className="flex items-center">
                <ImageFallback
                  src={IMAGES.GOOGLE_MEET}
                  alt="google meet"
                  width={16}
                  height={16}
                />
                <Button
                  onClick={handleJoinGoogleMeet}
                  className="!bg-blue-500 dark:!bg-blue-500 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  <Text
                    size="xl"
                    className="text-white dark:text-dark font-medium"
                    text="Join with Google Meet"
                  />
                </Button>
              </div>
              <Text
                size="xl"
                className="opacity-70 font-medium mt-1 text-2xl ml-[33px]"
                text={link}
              />
            </div>

            <div className="flex items-center mt-4">
              <FaUsers
                className="text-blue-800/30 dark:text-white/30"
                fontSize={18}
              />
              <Text
                size="xl"
                className="opacity-70 font-medium ml-4"
                text={`${guests?.length} guest${guests?.length !== 1 ? 's' : ''}`}
              />
            </div>
          </div>

          <div className="px-8 ml-4">
            <ul className="list-none">
              {guests?.map((guest, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 text-gray-600 dark:text-gray-300"
                >
                  <ImageFallback
                    src={guest.avatar}
                    width={30}
                    height={30}
                    className="rounded-full mr-2 !h-[30px]"
                    alt={`${guest.name}'s avatar`}
                  />
                  <Text
                    size="xl"
                    className="opacity-70 font-medium"
                    text={guest.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </>

        {/* Action Icons */}
        <div className="flex justify-end py-4 border-t border-gray-150 dark:border-gray-350 gap-3">
          <Button
            onClick={handleEdit}
            key="edit"
            className="!bg-[#f5f5fc] dark:!bg-[#2f3268] !py-3 !text-[#605cf8]"
            aria-label="Edit"
            startContent={
              <RiEdit2Fill className="!text-blue-500 dark:!text-purple-600 rounded-" />
            }
          >
            Edit
          </Button>
          <Button
            key="delete"
            onClick={handleDelete}
            className="!bg-[#fff7fb] dark:!bg-pink-600 !py-3 !text-pink-500"
            startContent={<AiFillDelete className="!text-pink-500" />}
            aria-label="Delete"
          >
            Delete
          </Button>
        </div>
      </ModalContent>
    </NextModal>
  );
};

export default memo(EventDetail, isEqual) as <T>(
  props: EventCardProps & T,
) => JSX.Element;
