export interface OrderI {
  _id: string
  userId: string
  products: object[]
  status: string
  timestamp: string
  total: number
}

export class OrderDTO {
  orderId?: string
  userId: string
  products: object[]
  status: string
  timestamp: string
  total: number

  constructor(data: OrderI) {
    this.orderId = data._id;
    this.userId = data.userId;
    this.products = data.products;
    this.status = data.status;
    this.timestamp = data.timestamp;
    this.total = data.total;
  };
};

export interface OrderBaseClass {
  getOrders(userId?: string): Promise<OrderDTO[]>;
  getOrderById(orderId: string): Promise<OrderDTO>;
  createOrder(
    userId: string,
    products: object[],
    status: string,
    timestamp: string,
    total: number
  ): Promise<OrderDTO>;
  completeOrder(orderId: string): Promise<OrderDTO>;
};