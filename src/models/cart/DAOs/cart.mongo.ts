import { MongoDBClient } from "../../../services/mongodb";
import { CartBaseClass, CartDTO, ProductObjectDTO } from "../cart.interface";
import { CartModel } from "../cart.schema";
import Logger from "../../../services/logger";
import moment from "moment";

export default class CartDAO implements CartBaseClass {
  private static instance: CartDAO;
  private static client: MongoDBClient;
  cart: any = CartModel;

  constructor() { };

  // Creo instancia de conexion a mongo
  static async getInstance() {
    if (!CartDAO.instance) {
      Logger.info('Inicializamos DAO Cart con Mongo Atlas');

      await MongoDBClient.getConnection();

      CartDAO.instance = new CartDAO();
      CartDAO.client = MongoDBClient.getConnection();
    };
    return CartDAO.instance;
  };

  // Busco el carrito
  async getCart(userId?: string): Promise<CartDTO> {
    try {
      const cartId = await this.cart.findOne({ userId });

      if (!cartId) throw new Error('El carrito no existe');

      return cartId;
    } catch (error: any) {
      Logger.error('Error al buscar el carrito');
      throw new Error(`Error al buscar el carrito: ${error.message}`);
    };
  };

  // Creo el carrito
  async createCart(userId: string, userAddress: object): Promise<CartDTO> {
    try {
      const cart: CartDTO = {
        userId,
        products: [],
        dateCreated: moment().format('DD-MMM-YYYY HH:mm:ss'),
        dateUpdated: moment().format('DD-MMM-YYYY HH:mm:ss'),
        userAddress: userAddress
      };
      const newCart = new this.cart(cart);

      await newCart.save();

      return newCart;
    } catch (error: any) {
      Logger.error('Error al crear el carrito');
      throw new Error(`Error al crear el carrito: ${error.message}`);
    };
  };

  // Agrego un producto al carrito
  async addToCart(cartId: string, product: ProductObjectDTO): Promise<CartDTO> {
    try {
      const cart = await this.cart.findById(cartId);

      if (!cart) throw new Error('El carrito no existe');

      const index = cart.products.findIndex((aProduct: any) => aProduct.productId === product.productId);
      console.log('productId', product.productId);
      console.log('productId',typeof product.productId);

      

      if (index < 0) cart.products.push(product);
      else cart.products[index].amount += product.amount;

      cart.dateUpdated = moment().format('DD-MMM-YYYY HH:mm:ss'),

        await cart.save();

      return cart;
    } catch (error: any) {
      Logger.error('Error al agregar un producto al carrito');
      throw new Error(`Error al agregar un producto al carrito: ${error.message}`);
    };
  };

  // Elimino un producto del carrito
  async removeToCart(cartId: string, product: ProductObjectDTO): Promise<CartDTO> {
    try {
      const cart = await this.cart.findById(cartId);

      if (!cart) throw new Error('El carrito no existe');

      const index = cart.products.findIndex((aProduct: any) => aProduct.productId === product.productId);

      if (index < 0) throw new Error('El producto no existe');
      if (cart.products[index].amount < product.amount) throw new Error('La cantidad que se desea eliminar es mayor que la del carrito');
      if (cart.products[index].amount == product.amount) cart.products.splice(index, 1);
      else cart.products[index].amount -= product.amount;

      await cart.save();

      return cart;
    } catch (error: any) {
      Logger.error('Error al eliminar un producto del carrito');
      throw new Error(`Error al eliminar un producto del carrito: ${error.message}`);
    };
  };

  // Vacio el carrito
  async emptyCart(cartId: string): Promise<CartDTO> {
    try {
      const cart = await this.cart.findById(cartId);

      if (!cart) throw new Error('El carrito no existe');

      cart.products = [];

      await cart.save();

      return cart;
    } catch (error: any) {
      Logger.error('Error al vaciar el carrito');
      throw new Error(`Error al vaciar el carrito: ${error.message}`);
    };
  };
};

