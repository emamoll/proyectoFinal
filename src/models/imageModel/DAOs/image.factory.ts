import ImageDAO from "./image.mongo";
import { PersistenceType } from "../../../config";
import Logger from "../../../services/logger";

export class ImageFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase Imagen con Mongo Atlas');
        return new ImageDAO();
      default:
        Logger.info('Retornando por defecto instancia clase Imagen Mongo Atlas');
        return new ImageDAO();
    };
  };
};