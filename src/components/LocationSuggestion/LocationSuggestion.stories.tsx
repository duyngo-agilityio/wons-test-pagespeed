import { useState, useEffect, ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Libraries
import { useDebounce } from 'use-debounce';

// Icons
import { HiLocationMarker } from 'react-icons/hi';

// Components
import LocationSuggestion from './index';
import { Input } from '../common';

// Types
interface LocationItem {
  properties: {
    formatted: string;
    name: string;
  };
}

const meta: Meta<typeof LocationSuggestion> = {
  title: 'Components/LocationSuggestion',
  component: LocationSuggestion,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof LocationSuggestion>;

// Mocked data
const mockLocationResponse = {
  features: [
    { properties: { formatted: 'New York, NY', name: 'New York' } },
    { properties: { formatted: 'Los Angeles, CA', name: 'Los Angeles' } },
  ],
};

const mockGetLocationSuggestion = async (_keyword: string) => {
  return mockLocationResponse;
};

const BasicUsage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchAddress, setSearchAddress] = useState<string>();
  const [locationsSuggestion, setLocationsSuggestion] = useState<
    LocationItem[]
  >([]);

  // Debounce searchAddress with a delay of 300ms
  const [debouncedSearchAddress] = useDebounce(searchAddress, 300);

  useEffect(() => {
    const handleFetchData = async (keyword: string) => {
      const locationResponse = await mockGetLocationSuggestion(keyword);

      setLocationsSuggestion(
        locationResponse?.features ? locationResponse.features : [],
      );
    };

    if (debouncedSearchAddress) {
      handleFetchData(debouncedSearchAddress);
    } else {
      setLocationsSuggestion([]);
    }
  }, [debouncedSearchAddress]);

  const handleClickSuggestion = (value: string) => {
    setSearchAddress(value);
    setLocationsSuggestion([]);
    setIsOpen(false);
  };

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);

    const value = event.target.value;
    setSearchAddress(value);
  };

  return (
    <div className="relative flex-1 h-[150px]">
      <Input
        placeholder="Enter your address"
        onChange={handleOnChangeSearch}
        endContent={<HiLocationMarker />}
        value={searchAddress}
      />
      {locationsSuggestion.length !== 0 && isOpen && (
        <div className="shadow-md p-3 absolute z-50 bg-white dark:bg-gray-400 w-full">
          {locationsSuggestion.map(({ properties }: LocationItem) => {
            const { formatted, name } = properties;

            return (
              <LocationSuggestion
                formatted={formatted}
                key={name}
                onClickSuggestion={handleClickSuggestion}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <BasicUsage />,
};
