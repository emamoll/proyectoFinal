import { UserModel } from "../user.schema";
import { MongoDBClient } from "../../../services/mongodb";
import { UserI } from "../user.interface";
import { UserDTO } from "../user.interface";
import Logger from "../../../services/logger";

export default class UserDAO {
  private static instance: UserDAO;
  private static client: MongoDBClient;
  user = UserModel;

  constructor() { };

  // Creo instancia de conexion a mongo
  static async getInstance() {
    if (!UserDAO.instance) {
      Logger.info('Inicializamos DAO User con Mongo Atlas');
      await MongoDBClient.getConnection();
      UserDAO.instance = new UserDAO();
      UserDAO.client = await MongoDBClient.getConnection()
    }
    return UserDAO.instance
  };

  // Creo el usuario
  async create(data: UserI): Promise<UserI> {
    try {
      const newUser = new this.user(data);
      await newUser.save();
      return newUser;
    } catch (error: any) {
      Logger.error('Error al crear el usuario');
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Busco el usuario por su email
  async getUserByEmail(email: string) {
    try {
      const response = await this.user.findOne({ email });
      return response;
    } catch (error: any) {
      Logger.info('Error al buscar el usuario');
      throw new Error(`Error: ${error.message}`);
    }
  }
}