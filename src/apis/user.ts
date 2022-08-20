import Config from "../config";
import { UserFactoryDAO } from "../models/user/DAOs/user.factory";
import { UserDTO, UserI, UserQueryI } from "../models/user/user.interface";
import { MongoDBClient } from "../services/mongodb";
import { categoryAPI } from "./category";

class UserAPI {
  user;

  constructor() {
    // Instancia de conexion a mongoDB
    this.user = UserFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion de query
  async query(email?: string): Promise<UserDTO> {
    const query = { $or: [] as UserQueryI[] };

    if (email) query.$or.push({ email });

    const response = await this.user.query(query);

    return response;
  }

  // Funcion de logueo
  async login(data: UserDTO): Promise<UserDTO> {
    return await this.user.login(data);
  }

  // Funcion de registro
  async signup(data: UserDTO): Promise<UserDTO> {
    const newUser = await this.user.signup(data);

    // Cuando se registra un usuario nuevo se crea un carrito unico
    // await categoryAPI.createCart(newUser.id);

    return newUser;
  }

  // Funcion para buscar todos los usuarios
  async getUsers(): Promise<UserDTO[]> {
    return this.user.getUsers();
  };

  // Funcion para buscar un usuario segun su id
  async getUserById(id: string): Promise<UserDTO> {
    return this.user.getUserById(id);
  };

  // Funcion para eliminar un usuario
  async deleteUser(id: string): Promise<any> {
    return this.user.deleteUser(id);
  };

  // Funcion para validar la contrasenia
  async validatePassword(user: any, password: string): Promise<boolean> {
    return await this.user.validatePassword(user, password)
  }
};

export const userAPI = new UserAPI();

