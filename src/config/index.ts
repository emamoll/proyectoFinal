import dotenv from 'dotenv';

dotenv.config();

export enum PersistenceType {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  AtlasMongo = 'ATLAS-MONGO',
  Firebase = 'FIREBASE'
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  PERSISTENCIA: PersistenceType.AtlasMongo,
  MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoLocalsrv',
  MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongosrv'
}