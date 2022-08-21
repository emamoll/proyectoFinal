import Config from "../config";
import { ProductFactoryDAO } from "../models/product/DAOs/product.factory";
import { NewProductDTO, ProductDTO, ProductI, ProductQueryI } from "../models/product/product.interface";
import { MongoDBClient } from "../services/mongodb";

class ProductAPI {
  product;

  constructor() {
    // Instancia de conexion a mongoDB
    this.product = ProductFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para crear un producto
  async createProduct(productData: NewProductDTO): Promise<ProductDTO> {
    const newProduct = await this.product.createProduct(productData);

    return newProduct;
  };

  // Funcion para buscar todos los productos
  async getProducts(id: string | undefined = undefined): Promise<ProductDTO[]> {
    if (id) return this.product.getProducts(id);
    else return this.product.getProducts();
  };

  async getProductsByCategory(categoryId: string) {
    const category = await this.product.query({ categoryId });

    return category;
  }

  // Funcion para editar un producto
  async updateProduct(id: string, newData: NewProductDTO) {
    const productUpdate = await this.product.updateProduct(id, newData);

    return productUpdate;
  }

  // Funcion para eliminar un producto
  async deleteProduct(id: string) {
    const product = await this.product.deleteProduct(id);

    return product;
  };

  // Funcion de query
  async query(data: ProductQueryI) {
    const product = await this.product.query(data);

    return product;
  };
};

export const productAPI = new ProductAPI();