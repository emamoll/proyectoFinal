import OrderDAO from "./order.mongo";
import { PersistenceType } from "../../../config";
import Logger from "../../../services/logger";

export class OrderFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase Orden Mongo Atlas');
        return new OrderDAO();
      default:
        Logger.info('Retornando por defecto instancia clase Orden Mongo Atlas');
        return new OrderDAO();
    };
  };
};