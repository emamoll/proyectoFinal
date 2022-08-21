export interface ProductI {
  _id?: string
  name: string
  desription: string
  categoryId: object
  price: number
  stock: number
  image: string
  timestamp: string
};

export class ProductDTO {
  id: string
  name: string
  desription: string
  categoryId: object
  price: number
  stock: number
  image: string
  timestamp: string

  constructor(data: ProductI) {
    this.id = data._id || '';
    this.name = data.name;
    this.desription = data.desription;
    this.categoryId = data.categoryId;
    this.price = data.price;
    this.stock = data.stock;
    this.image = data.image;
    this.timestamp = data.timestamp;
  };
};

export interface NewProductI {
  id?: string
  name?: string
  desription?: string
  categoryId?: string
  price?: number
  stock?: number
  image?: string
  timestamp?: string
};


export class NewProductDTO {
  id?: string
  name?: string
  desription?: string
  categoryId?: string
  price?: number
  stock?: number
  image?: string
  timestamp?: string

  constructor (data: NewProductI) {
    this.id = data.id;
    this.name = data.name;
    this.desription = data.desription;
    this.categoryId = data.categoryId;
    this.price = data.price;
    this.stock = data.stock;
    this.image = data.image;
    this.timestamp = data.timestamp;
  }
};

export interface ProductQueryI {
  name?: string
  desription?: string
  categoryId?: string
  price?: number
  stock?: number
  image?: string
  timestamp?: string
};

export interface ProductBaseClass {
  createProduct(data: NewProductDTO): Promise<ProductDTO>;
  getProducts(id?: string | undefined): Promise<ProductDTO[]>;
  updateProduct(id: string, newData: NewProductDTO): Promise<ProductDTO>;
  deleteProduct(id: string): Promise<void>;
  query(options: ProductQueryI): Promise<ProductDTO[]>;
};