// mocks
import { products } from '@/mocks';

// components
import { ProductCard } from '@/components';
import { TableLayout } from '@/layouts';

const TopSellingProducts = () => {
  return (
    <TableLayout title="Top Selling Service">
      {products.map(
        (
          { id, imageUrl, title = 'Product Title', price = 0, rating = 0 },
          index,
        ) => (
          <div key={id} className="h-[150px] flex items-center">
            <div className="w-full">
              <ProductCard
                url={imageUrl}
                title={title}
                price={price}
                rating={rating}
                className="shadow-none"
              />
              {index < products.length - 1 && (
                <div className="border-t border-red-300 dark:border-gray-600 mt-4" />
              )}
            </div>
          </div>
        ),
      )}
    </TableLayout>
  );
};

export default TopSellingProducts;
