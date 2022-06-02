export class Product {

  id: string;
  name: string;
  sku: number;
  price: number;
  description: string;
  image: string;
  cant: number;

  public static createObject(obj: any): Product {
    const object = new Product();
    object.id = obj.id ? obj.id : null;
    object.name = obj.name ? obj.name : '';
    object.sku = obj.sku ? obj.sku : null;
    object.price = obj.price ? obj.price : null;
    object.description = obj.description ? obj.description : '';
    object.image = obj.image ? obj.image : '';
    object.cant = obj.cant ? obj.cant : 1;
    return object;
  }

  static createObjects(_objs: any): Product[] {
    const newObjs = [];
    if (_objs && (_objs instanceof Array)) {
      for (const item of _objs) {
        newObjs.push(Product.createObject(item));
      }
    }
    return newObjs;
  }
}
