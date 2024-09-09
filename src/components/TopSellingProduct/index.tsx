// mocks
import { products } from '@/mocks';

// components
import { ProductCard } from '@/components';

// layouts
import { TableLayout } from '@/layouts';

const TopSellingProducts = () => {
  return (
    <TableLayout title="Top Selling Service">
      {products.map(
        (
          { id, imageUrl, title = 'Product Title', price = 0, rating = 0 },
          index,
        ) => (
          <div key={id}>
            <ProductCard
              url={imageUrl}
              title={title}
              price={price}
              rating={rating}
              className="shadow-none py-11"
            />
            {index < products.length - 1 && (
              <div className="border-t border-gray-300 dark:border-gray-600 my-4" />
            )}
          </div>
        ),
      )}
    </TableLayout>
  );
};

export default TopSellingProducts;
