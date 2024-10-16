'use client';

import { ChangeEvent, memo, useEffect, useState } from 'react';
import { InputProps } from '@nextui-org/react';
import { useDebounce } from 'use-debounce';

// Icons
import { HiLocationMarker } from 'react-icons/hi';

// Components
import { Input, Text } from '@/components';
import { getLocationSuggestion } from '@/services';

interface AddressInputProps extends Omit<InputProps, 'onChange'> {
  onChange: (value: string) => void;
}

interface LocationItem {
  properties: {
    formatted: string;
    name: string;
  };
}

const AddressInput = ({
  placeholder = ' ',
  value,
  onChange,
  ...rest
}: AddressInputProps) => {
  const [searchAddress, setSearchAddress] = useState(value);
  const [locationsSuggestion, setLocationsSuggestion] = useState<
    LocationItem[]
  >([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Debounce searchAddress with a delay of 500ms
  const [debouncedSearchAddress] = useDebounce(searchAddress, 300);

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);

    const value = event.target.value;
    onChange && onChange(value);
    setSearchAddress(value);
  };

  useEffect(() => {
    const handleFetchData = async (keyword: string) => {
      const locationResponse = await getLocationSuggestion(keyword);

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

    onChange && onChange(value);
  };

  return (
    <div className="relative flex-1">
      <Input
        placeholder={placeholder}
        value={searchAddress}
        onChange={handleOnChangeSearch}
        endContent={<HiLocationMarker />}
        {...rest}
      />
      {locationsSuggestion.length !== 0 && isOpen && (
        <div className="shadow-md p-3 absolute z-50 bg-white dark:bg-gray-400 w-full">
          {locationsSuggestion.map(({ properties }: LocationItem) => {
            const { formatted, name } = properties;

            return (
              <button
                key={name}
                className="flex w-full text-left py-[10px] px-[4px] gap-4 items-center relative cursor-pointer dark:text-white/80"
                onClick={() => handleClickSuggestion(formatted)}
              >
                <div className="w-[16px] h-[16px]">
                  <HiLocationMarker />
                </div>

                <Text text={formatted} className="dark:text-white/80" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(AddressInput);
