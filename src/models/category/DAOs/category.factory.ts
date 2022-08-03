import CategoryDAO from "./category.mongo";
import { PersistenceType } from "../../../config";
import Logger from "../../../services/logger";

export class CategoryFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase Category Mongo Atlas');
        return new CategoryDAO();
      default:
        Logger.info('Retornando por defecto instancia clase Mongo Atlas');
        return new CategoryDAO();
    };
  };
};