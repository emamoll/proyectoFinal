export interface OrderI {
  _id: string
  userId: string
  products: object[]
  status: string
  timestamp: string
  total: number
}

export class OrderDTO {
  id?: string
  userId: string
  products: object[]
  status: string
  timestamp: string
  total: number

  constructor(data: OrderI) {
    this.id = data._id;
    this.userId = data.userId;
    this.products = data.products;
    this.status = data.status;
    this.timestamp = data.timestamp;
    this.total = data.total;
  };
};

export interface OrderBaseClass {
  getOrders(userId?: string): Promise<OrderDTO[]>;
  getOrderById(id: string): Promise<OrderDTO>;
  createOrder(
    userId: string,
    products: object[],
    status: string,
    timestamp: string,
    total: number
  ): Promise<OrderDTO>;
  completeOrder(id: string): Promise<OrderDTO>;
};