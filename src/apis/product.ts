import Config from "../config";
import { ProductFactoryDAO } from "../models/product/DAOs/product.factory";
import { ProductI } from "../models/product/product.interface";
import { MongoDBClient } from "../services/mongodb";

class ProductAPI {
  product;

  constructor() {
    // Instancia de conexion a mongoDB
    this.product = ProductFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para crear un producto
  async createProduc(userData: ProductI) {
    const newUser = await this.product.createProduc(userData);
    return newUser;
  };

  // Funcion para buscar todos los productos
  async getProducts() {
    return this.product.getProducts();
  }

  // Funcion para buscar un producto segun su id
  async getProductById(id: string) {
    return this.product.getProductById(id);
  };

  // Funcion para editar un producto
  async updateProduct(id: string, newData: ProductI) {
    return this.product.updateProduct(id,newData);
  }

  // Funcion para eliminar un producto
  async deleteProduct(id: string) {
    return this.product.deleteProduct(id);
  }; 
};

export const productAPI = new ProductAPI();