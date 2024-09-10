// mocks
import { products } from '@/mocks';

// components
import { ProductCard } from '@/components';

// layouts
import { TableLayout } from '@/layouts';

const TopSellingProducts = () => {
  return (
    <TableLayout title="Top Selling Products" className="h-full md:p-5">
      {products.map(
        (
          { id, imageUrl, title = 'Product Title', price = 0, rating = 0 },
          index,
        ) => (
          <div key={id} className="mb-6 w-full">
            <ProductCard
              url={imageUrl}
              title={title}
              price={price}
              rating={rating}
              className="shadow-none py-4"
            />
            {index < products.length - 1 && (
              <div className="border-t border-gray-300 dark:border-gray-600 my-8" />
            )}
          </div>
        ),
      )}
    </TableLayout>
  );
};

export default TopSellingProducts;
