import { memo } from 'react';
import { HiLocationMarker } from 'react-icons/hi';

import { Text } from '@/components';

interface LocationSuggestionProps {
  onClickSuggestion: (value: string) => void;
  formatted: string;
}

const LocationSuggestion = ({
  onClickSuggestion,
  formatted,
}: LocationSuggestionProps) => {
  const handleClickSuggestion = () => {
    onClickSuggestion(formatted);
  };

  return (
    <div
      className="flex w-full text-left py-[10px] px-[4px] gap-4 items-center relative cursor-pointer dark:text-white/80"
      onClick={handleClickSuggestion}
    >
      <div className="w-[16px] h-[16px]" data-testid="location-icon">
        <HiLocationMarker />
      </div>

      <Text text={formatted} className="dark:text-white/80" />
    </div>
  );
};

export default memo(LocationSuggestion);
