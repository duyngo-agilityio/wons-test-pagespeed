// mocks
import { products } from '@/mocks';

// components
import { ProductCard } from '@/components';

const TopSellingProducts = () => {
  return (
    <div className="dark:bg-gray-600 bg-white p-6 rounded-lg shadow-lg w-full max-w-full md:max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-900 dark:text-gray-200 text-xl font-semibold">
          Top Selling Products
        </h2>
        <div className="text-gray-400">...</div>
      </div>

      <div className="space-y-4">
        {products.map(
          ({
            id,
            imageUrl,
            title = 'Product Title',
            price = 0,
            rating = 0,
          }) => (
            <ProductCard
              key={id}
              url={imageUrl}
              title={title}
              price={price}
              rating={rating}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;
