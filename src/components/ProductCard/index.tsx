// icons
import { FaStar } from 'react-icons/fa';

// components
import { Card, ImageFallback } from '@/components/common';

interface ProductCardProps {
  url: string;
  title: string;
  price?: number;
  rating?: number;
  alt?: string;
  className?: string;
}

const ProductCard = ({
  url,
  title,
  price = 0,
  rating = 0,
  alt = 'image alt',
  className = '',
}: ProductCardProps) => {
  return (
    <Card
      className={`bg-white dark:bg-gray-400 rounded-lg shadow-lg ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center">
        <div className="w-24 h-24 sm:w-20 sm:h-20 mb-4 sm:mb-0">
          <ImageFallback
            src={url}
            alt={alt}
            width={100}
            height={100}
            className="rounded-lg object-cover !h-full"
          />
        </div>

        <div className="sm:ml-4 flex-1 text-center sm:text-left">
          <h3 className="text-black dark:text-white font-semibold text-lg sm:text-xl">
            {title}
          </h3>
          <div className="flex justify-center sm:justify-start py-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`${
                  index < rating ? 'text-pink-500' : 'text-pink-300'
                }`}
              />
            ))}
          </div>
          <p className="text-black dark:text-white text-base sm:text-lg font-semibold">
            ${price}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
