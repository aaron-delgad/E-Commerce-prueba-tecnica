import {Product} from './../base/product';

export class ProductListResponse {
  type: boolean;
  ready: string;
  data: Product[];

  static createFromObject(obj: any): ProductListResponse {
    const newObj = new ProductListResponse();
    newObj.data = Product.createObjects(obj.data);
    return newObj;
  }
}
