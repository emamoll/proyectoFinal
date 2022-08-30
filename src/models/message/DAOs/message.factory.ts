import MessageDAO from "./message.mongo";
import { PersistenceType } from "../../../config";
import Logger from "../../../services/logger";

export class MessageFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase Mensaje Mongo Atlas');
        return new MessageDAO();
      default:
        Logger.info('Retornando por defecto instancia clase Mensaje Mongo Atlas');
        return new MessageDAO();
    };
  };
};