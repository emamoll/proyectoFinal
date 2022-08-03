export interface ProductI {
  _id?: object
  name: string
  desription: string
  categoryId: object
  price: number
  meassure: string
  stock: number
  image: string
  timestamp: string
};

export class ProductDTO {
  id: {}
  name: string
  desription: string
  categoryId: object
  price: number
  meassure: string
  stock: number
  image: string
  timestamp: string

  constructor(data: ProductI) {
    this.id = data._id || '';
    this.name = data.name;
    this.desription = data.desription;
    this.categoryId = data.categoryId;
    this.price = data.price;
    this.meassure = data.meassure;
    this.stock = data.stock;
    this.image = data.image;
    this.timestamp = data.timestamp;
  };
};

export interface ProductBaseClass {
  createProduct(data: ProductI): Promise<ProductDTO>;
  getProducts([]): Promise<[]>;
  getProductById(id: string): Promise<ProductDTO>;
  updateProduct(id: string, newData: ProductI): Promise<ProductDTO>;
  deleteProduct(id: string): Promise<ProductDTO>;
}