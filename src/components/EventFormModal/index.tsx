import { memo } from 'react';

// Libraries
import isEqual from 'react-fast-compare';

// Icons
import { IoClose } from 'react-icons/io5';
import { ClockIcon, CalendarIcon, LocationIcon, PeopleIcon } from '../common';

// Components
import { Heading, Input, Button, Text } from '@/components/common';
import Tabs from '@/components/Tabs';
import { Button as NextButton } from '@nextui-org/react';

// Mocks
import { EVENT_TABS } from '@/mocks';

// Types

const EventFormModal = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#030229]/20">
      <div className="relative top-0 left-0 p-[30px_30px_40px] bg-white rounded-[10px] shadow-[ -14px_30px_20px_0px_rgba(0,0,0,0.05)] w-[467px]">
        <form>
          <Heading size="md" title="Create an Event" className="mt-[12px]" />

          <Button
            className="absolute top-[30px] right-[30px] !bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
            data-testid="close-button"
          >
            <IoClose size={20} />
          </Button>

          <Tabs
            style={{ padding: 0, margin: '40px 0 18px' }}
            tabs={EVENT_TABS}
          />

          <Input
            classNames={{
              inputWrapper:
                'w-full h-[42px] rounded-[10px] bg-[#99B2C6]/30 m-[0_0_25px]',
              input:
                'placeholder:text-[#06152B] placeholder:opacity-20 placeholder:font-medium placeholder:text-[16px]',
            }}
            placeholder="Add title"
          />

          <div className="flex gap-[0_15px]">
            <Button
              className="!bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
              data-testid="time-button"
            >
              <ClockIcon />
            </Button>

            <div className="grid grid-rows-2 grid-cols-2 max-w-[290px] gap-[0_30px]">
              <Text
                className="text-[#06152B] text-[12px] font-normal leading-normal col-span-1"
                text="Thursday. December 5" // Display date
              />
              <Text
                className="text-[#06152B] text-[12px] font-normal leading-normal col-span-1"
                text="12:00pm - 1:00pm" // Display time
              />
              <Text
                className="text-[#010d1c] text-opacity-50 text-[12px] font-normal leading-normal col-span-2"
                text="Time zone - Does not repeat"
              />
            </div>
          </div>

          <NextButton className="m-[5px_0_0_45px] p-[10px] bg-[transparent] text-[#FF69B4] text-center text-[15px] font-normal leading-normal active:bg-transparent active:opacity-50">
            Find a time
          </NextButton>

          <div className="flex gap-[0_25px] m-[10px_0_30px]">
            <Button
              color="primary"
              startContent={<PeopleIcon />}
              className="text-[15px] font-medium md:w-auto py-[10px] px-[25px] w-full mt-10 md:mt-0"
            >
              Add People
            </Button>

            <Button
              startContent={<LocationIcon />}
              className="!bg-white font-medium dark:!bg-white text-center !text-[#3A36DB] dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] px-[25px] !rounded-[10px] font-DM-Sans text-[14.22px] font-normal leading-normal"
            >
              Add Location
            </Button>
          </div>

          <div className="m-[0_0_40px] flex gap-[0_15px]">
            <Button
              className="!bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
              data-testid="calendar-button"
            >
              <CalendarIcon width={15} height={15} color="#FF69B4" />
            </Button>

            <div className="flex flex-col max-w-[290px] gap-[0_30px]">
              <Text
                className="text-[#06152B] text-[12px] font-normal leading-normal col-span-1"
                text="John Deo" // Display name
              />
              <Text
                className="text-[#010d1c] text-opacity-50 text-[12px] font-normal leading-normal"
                text="Busy - Default visibility - notity 30 minutes before" // Display status
              />
            </div>
          </div>

          <div className="flex flex-row-reverse gap-[0_20px]">
            <Button
              type="submit"
              color="primary"
              className="min-w-[93px] text-[15px] font-normal md:w-auto py-[10px] w-full mt-10 md:mt-0"
            >
              Save
            </Button>

            <Button className="min-w-[93px] !bg-white font-normal dark:!bg-white text-center !text-[#3A36DB] dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] !rounded-[10px] font-DM-Sans text-[15px] font-normal leading-normal">
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(EventFormModal, isEqual);
