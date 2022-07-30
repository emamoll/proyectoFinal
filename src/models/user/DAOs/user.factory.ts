import UserDAO from './user.mongo';
import { PersistenceType } from '../../../config';
import Logger from '../../../services/logger';

export class UserFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase Mongo Atlas');
        return new UserDAO();
      default:
        Logger.info('Retornando por defecto instancia clase Mongo Atlas');
        return new UserDAO()
    };
  }
}


