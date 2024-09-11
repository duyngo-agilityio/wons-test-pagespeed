// Components
import { getAllProducts } from '@/api';
import { NoProductAvailable, ProductCard } from '@/components';

// Layouts
import { TableLayout } from '@/layouts';

const TopSellingProducts = async () => {
  const { data: topProducts } = await getAllProducts();

  return (
    <TableLayout title="Top Selling Products" className="h-full md:!p-5">
      {topProducts?.length ? (
        topProducts.map(
          (
            {
              id,
              attributes: {
                imageUrl,
                title = 'Product Title',
                price = 0,
                rating = 0,
              },
            },
            index,
          ) => {
            const hasBorder = index < topProducts.length - 1;
            return (
              <div key={id} className="mb-6 w-full">
                <ProductCard
                  url={imageUrl}
                  title={title}
                  price={price}
                  rating={rating}
                  className="shadow-none py-4"
                />
                {hasBorder && (
                  <div className="border-t border-gray-300 dark:border-gray-600 my-8" />
                )}
              </div>
            );
          },
        )
      ) : (
        <NoProductAvailable message="No top selling products at the moment" />
      )}
    </TableLayout>
  );
};

export default TopSellingProducts;
