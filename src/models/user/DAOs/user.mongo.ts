import { UserModel } from "../user.schema";
import { MongoDBClient } from "../../../services/mongodb";
import { UserI } from "../user.interface";
import { UserDTO } from "../user.interface";
import Logger from "../../../services/logger";
import bcrypt from 'bcrypt'

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
    };
    return UserDAO.instance;
  };

  // Busco si el ObjectId es valido
  isValid(id: string): boolean {
    return UserDAO.client.isValid(id)
  }

  // Creo el usuario
  async createUser(data: UserI) {
    try {
      const newUser = new this.user(data);
      await newUser.save();
      return newUser;
    } catch (error: any) {
      Logger.error('Error al crear el usuario');
      throw new Error(`Error: ${error.message}`);
    };
  };

  // Busco todos los usuarios
  async getUsers() {
    try {
      const response = await this.user.find();
      return response;
    } catch (error: any) {
      Logger.error('Error al buscar todos los usuarios');
      throw new Error(`Error al buscar todos los usuarios: ${error.message}`);
    };
  };

  // Busco el usuario por su email
  async getUserByEmail(email: string) {
    try {
      const response = await this.user.findOne({ email });
      return response;
    } catch (error: any) {
      Logger.error('Error al buscar el usuario por se email');
      throw new Error(`Error al buscar el usuario: ${error.message}`);
    };
  };

  // Busco el usuario por su id
  async getUserById(id: string) {
    try {
      const response = await this.user.findById(id);
      return response;
    } catch (error: any) {
      Logger.error('Error al buscar el usuario por su id');
      throw new Error(`Error al buscar el usuario: ${error.message}`);
    };
  };

  // Edito el usuario
  async updateUser(id: string, newData: UserI) {
    try {
      const response = await this.user.findByIdAndUpdate(id, newData);
      return response;
    } catch (error: any) {
      Logger.error('Error al editar el usuario');
      throw new Error(`Error al editar el usuario: ${error.message}`);
    };
  };

  // Elimino el usuario {
  async deleteUser(id: string) {
    try {
      const response = await this.user.findByIdAndDelete(id);
      return response;
    } catch (error: any) {
      Logger.error('Error al eliminar el usuario');
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    };
  };

  // Valido la contrasenia
  async validatePassword(user: UserI, password: string) {
    const response = await this.user.findOne({ email: user.email });

    if (!response)
      return false;

    const compare = await bcrypt.compare(password, response.password);

    if (!compare)
      return false;

    return true
  }
};