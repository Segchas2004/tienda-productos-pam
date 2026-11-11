import { ProductMapper } from '../../infrastructure/mappers/product.mapper';
import { ProductResponse } from '../../infrastructure/responses/product.response';
import { productApi } from '../api/product-api';

export const getProductsAction = async () => {
  const { data } = await productApi.get<ProductResponse[]>('/products');
  return data.map(ProductMapper.fromApiToProduct);
};
