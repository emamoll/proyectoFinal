import CartDAO from './cart.mongo';
import { PersistenceType } from '../../../config';
import Logger from '../../../services/logger';

export class CartFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase Carrito Mongo Atlas');
        return new CartDAO();
      default:
        Logger.info('Retornando por defecto instancia clase Carrito Mongo Atlas');
        return new CartDAO()
    };
  };
};