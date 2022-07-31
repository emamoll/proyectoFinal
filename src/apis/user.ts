import { Request, Response, NextFunction } from "express";
import Config from "../config";
import { UserFactoryDAO } from "../models/user/DAOs/user.factory";
import { UserI } from "../models/user/user.interface";
import { MongoDBClient } from "../services/mongodb";

class UserAPI {
  user;

  constructor() {
    this.user = UserFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  async createUser(userData: UserI) {
    const newUser = await this.user.create(userData);
    return newUser;
  };

  async getUserByEmail(email: string) {
    return this.user.getUserByEmail(email)
  };
}

export const userAPI = new UserAPI();

