import { Product } from '../interfaces/product.interface';
import { ProductResponse } from '../responses/product.response';
import { textos, categorias, TIPO_CAMBIO } from '../data/productos-es';

export class ProductMapper {
  static fromApiToProduct = (product: ProductResponse): Product => ({
    id: product.id,
    nombre: textos[product.id]?.nombre ?? product.title,
    imagen: product.image,
    precio: Math.round(product.price * TIPO_CAMBIO * 100) / 100,
    descripcion: textos[product.id]?.descripcion ?? product.description,
    categoria: categorias[product.category] ?? product.category,
  });
}
