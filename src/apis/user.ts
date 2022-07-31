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
    const newUser = await this.user.create(userData);
    return newUser;
  };

  // Funcion para buscar usuario segun su email
  async getUserByEmail(email: string) {
    return this.user.getUserByEmail(email)
  };
}

export const userAPI = new UserAPI();

