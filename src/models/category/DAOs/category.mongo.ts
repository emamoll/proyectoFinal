import { CategoryModel } from "../category.schema";
import { MongoDBClient } from "../../../services/mongodb";
import { CategoryI } from "../category.interface";
import Logger from "../../../services/logger";

export default class CategoryDAO {
  private static instance: CategoryDAO;
  private static client: MongoDBClient;
  category = CategoryModel;

  constructor() { };

  // Creo instancia de conexion a mongo
  static async getInstance() {
    if (!CategoryDAO.instance) {
      Logger.info('Inicializamos DAO Category con Mongo Atlas');
      await MongoDBClient.getConnection();
      CategoryDAO.instance = new CategoryDAO();
      CategoryDAO.client = await MongoDBClient.getConnection();
    };
    return CategoryDAO.instance;
  };

  // Creo la categoria
  async createCategory(data: CategoryI) {
    try {
      const newProduct = new this.category(data);
      await newProduct.save();
      return newProduct;
    } catch (error: any) {
      Logger.error('Error al crear la categoria');
      throw new Error(`Error: ${error.message}`);
    };
  };

  // Busco todas las categorias
  async getCategories() {
    try {
      const response = await this.category.find();
      return response;
    } catch (error: any) {
      Logger.error('Error al buscar todas las categorias');
      throw new Error(`Error al buscar todas las categorias: ${error.message}`);
    };
  };

  // Busco la categoria por su id
  async getCategoryById(id: string) {
    try {
      const response = await this.category.findById(id);

      if (!response) throw new Error('La categoria no existe');

      return response;
    } catch (error: any) {
      Logger.error('Error al buscar la categoria por su id');
      throw new Error(`Error al buscar la categoria: ${error.message}`);
    };
  };

  // Edito la categoria
  async updateCategory(id: string, newData: CategoryI) {
    try {
      const response = await this.category.findByIdAndUpdate(id, newData);

      if (!response) throw new Error('La categoria no existe');

      return response;
    } catch (error: any) {
      Logger.error('Error al editar la categoria');
      throw new Error(`Error al editar la categoria: ${error.message}`);
    };
  };

  // Elimino la categoria {
  async deleteCategory(id: string) {
    try {
      const response = await this.category.findByIdAndDelete(id);

      if (!response) throw new Error('La categoria no existe');

      return response;
    } catch (error: any) {
      Logger.error('Error al eliminar la categoria');
      throw new Error(`Error al eliminar la categoria: ${error.message}`);
    };
  };
};