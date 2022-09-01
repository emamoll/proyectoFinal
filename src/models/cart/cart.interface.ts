export interface CartI {
  _id?: any
  userId: string
  products: ProductObjectDTO[]
  dateCreated?: string
  dateUpdated?: string
  userAddress: object
};

export class CartDTO {
  id?: any
  userId: string
  products: ProductObjectDTO[]
  dateCreated?: string
  dateUpdated?: string
  userAddress: object

  constructor(data: CartI) {
    this.id = data._id;
    this.userId = data.userId;
    this.products = data.products;
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
    this.userAddress = data.userAddress;
  };
};

export interface ProductObjectI {
  _id: string
  amount: number
};

export class ProductObjectDTO {
  productId: string
  amount: number

  constructor(data: ProductObjectI) {
    this.productId = data._id;
    this.amount = data.amount
  };
};

export interface CartBaseClass {
  getCart(userId?: string): Promise<CartDTO>;
  createCart(userId: string, userAddress: object): Promise<CartDTO>;
  addToCart(cartId: string, product: ProductObjectDTO): Promise<CartDTO>;
  removeToCart(cartId: string, product: ProductObjectDTO): Promise<CartDTO>;
  emptyCart(cartId: string, productId: ProductObjectDTO): Promise<CartDTO>;
};