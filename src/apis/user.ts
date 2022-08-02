import { Request, Response, NextFunction } from "express";
import Config from "../config";
import { UserFactoryDAO } from "../models/user/DAOs/user.factory";
import { UserI } from "../models/user/user.interface";
import { MongoDBClient } from "../services/mongodb";

class UserAPI {
  user;

  constructor() {
    // Instancia de conexion a mongoDB
    this.user = UserFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para crear usuario
  async createUser(userData: UserI) {
    const newUser = await this.user.createUser(userData);
    return newUser;
  };

  // Funcion para buscar todos los usuarios
  async getUsers() {
    return this.user.getUsers();
  }

  // Funcion para buscar usuario segun su email
  async getUserByEmail(email: string) {
    return this.user.getUserByEmail(email);
  };

  // Funcion para buscar usuario segun su id
  async getUserById(id: string) {
    return this.user.getUserById(id);
  };

  // Funcion para editar el usuario
  async updateUser(id: string, newData: UserI) {
    return this.user.updateUser(id,newData);
  }

  // Funcion para eliminar el usuario
  async deleteUser(id: string) {
    return this.user.deleteUser(id);
  };

  // Funcion para validar la contrasenia
  async validatePassword(user: any, password: string) {
    return await this.user.validatePassword(user, password)
  }
};

export const userAPI = new UserAPI();

