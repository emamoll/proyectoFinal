import ProductDAO from './product.mongo';
import { PersistenceType } from '../../../config';
import Logger from '../../../services/logger';

export class ProductFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase Product Mongo Atlas');
        return new ProductDAO();
      default:
        Logger.info('Retornando por defecto instancia clase Producto Mongo Atlas');
        return new ProductDAO();
    };
  };
};