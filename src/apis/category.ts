import Config from "../config";
import { CategoryFactoryDAO } from "../models/category/DAOs/category.factory";
import { CategoryDTO } from "../models/category/category.interface";
import { MongoDBClient } from "../services/mongodb";

class CategoryAPI {
  category;

  constructor() {
    // Instancia de conexion a mongoDB
    this.category = CategoryFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para crear una categoria
  async createCategory(userData: CategoryDTO) {
    const newUser = await this.category.createCategory(userData);
    return newUser;
  };

  // Funcion para buscar todas las categorias
  async getCategories() {
    return await this.category.getCategories();
  }

  // Funcion para buscar una categoria segun su id
  async getCategoryById(id: string) {
    return await this.category.getCategoryById(id);
  };

  // Funcion para editar una categoria
  async updateCategory(id: string, newData: CategoryDTO) {
    return await this.category.updateCategory(id, newData);
  }

  // Funcion para eliminar una categoria
  async deleteCategory(id: string) {
    return await this.category.deleteCategory(id);
  };
};

export const categoryAPI = new CategoryAPI();