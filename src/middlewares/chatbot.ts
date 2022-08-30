import moment from "moment";
import { productAPI } from "../apis/product";
import { ProductDTO } from "../models/product/product.interface";
import { cartAPI } from "../apis/cart";
import { orderAPI } from "../apis/order";

export const chatbot = async (userId: string, messageBot: any) => {
  const chat = messageBot.message.toString().toLowerCase();

  let message = {
    userId: userId,
    from: 'System',
    message: '',
    time: moment().format('DD-MMM-YYYY HH:mm:ss')
  };

  if (chat.toLowerCase().includes('stock')) {
    const products = productAPI.getProducts();
    const stock = (await products).map((product: ProductDTO) => {
      return `${product.name} => ${product.stock}`;
    });
    message.message = `Los stocks disponibles son: ${JSON.stringify(stock)}`;

    return message;
  };

  if (chat.toLowerCase().includes('orden')) {
    const orders = orderAPI.getOrders(userId);
    const last = (await orders).pop();

    if (last === undefined) message.message = 'No tiene ordenes'
    else message.message = `Su ultima orden fue: ${JSON.stringify(last)}`;

    return message;
  };

  if (chat.toLowerCase().includes('carrito')) {
    const cart = await cartAPI.getCart(userId);

    message.message = `Su carrito es: ${JSON.stringify(cart)}`;

    return message;
  };

  const text = async () => {
    message.message = `
      <p>/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/</p>
      <p>/ Hola! No se pude comprender tu mensaje. Por favor ingresa una de las siguientes opciones:   /</p>
      <p>/   - Stock: Para conocer nuestro actual stock.                                               /</p>
      <p>/   - Orden: Para conocer la informacion de tu ultima orden.                                  /</p>
      <p>/   - Carrito: Para conocer el estado actual de tu carrito.                                   /</p>
      <p>/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/</p>
    `
    return message;
  };

  return await text();
};
