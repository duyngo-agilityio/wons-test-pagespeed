// Utils
import { isAdmin } from '@/utils';

// Components
import { ProductDrawer } from '@/components';

const ProductActions = async (): Promise<JSX.Element> => {
  const isSuperAdmin = await isAdmin();

  return isSuperAdmin ? <ProductDrawer /> : <></>;
};

export default ProductActions;
