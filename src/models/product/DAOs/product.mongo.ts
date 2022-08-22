import { ProductModel } from "../product.shema";
import { MongoDBClient } from "../../../services/mongodb";
import { NewProductDTO, ProductBaseClass, ProductDTO, ProductQueryI } from "../product.interface";
import Logger from "../../../services/logger";
import moment from 'moment';

export default class ProductDAO implements ProductBaseClass {
  private static instance: ProductDAO;
  private static client: MongoDBClient;
  product: any = ProductModel;

  constructor() { };

  // Creo instancia de conexion a mongo
  static async getInstance() {
    if (!ProductDAO.instance) {
      Logger.info('Inicializamos DAO Product con Mongo Atlas');

      await MongoDBClient.getConnection();
      
      ProductDAO.instance = new ProductDAO();
      ProductDAO.client = await MongoDBClient.getConnection();
    };
    return ProductDAO.instance;
  };

  // Creo el producto
  async createProduct(data: NewProductDTO): Promise<ProductDTO> {
    try {
      const product: ProductDTO = {
        name: data.name!,
        description: data.description!,
        categoryId: data.categoryId!,
        price: data.price!,
        stock: data.stock!,
        image: data.image!,
        timestamp: moment().format('DD-MMM-YYYY HH:mm:ss')
      }
      const newProduct = new this.product(product);

      await newProduct.save();

      return newProduct;
    } catch (error: any) {
      Logger.error('Error al crear el producto');
      throw new Error(`Error: ${error.message}`);
    };
  };

  // Busco todos los productos
  async getProducts(id?: string): Promise<ProductDTO[]> {
    let response: ProductDTO[] = [];

    try {
      if (id) {
        const productId = await this.product.findById(id);

        if (productId) response.push(productId);
      } else response = await this.product.find();

      return response;
    } catch (error: any) {
      Logger.error('Error al buscar todos los productos');
      throw new Error(`Error al buscar todos los productos: ${error.message}`);
    };
  };

  // Edito el producto
  async updateProduct(id: string, newData: NewProductDTO): Promise<ProductDTO> {
    try {
      const productUpdate: any = newData;
      const response = await this.product.findByIdAndUpdate(id, productUpdate).then(() => this.product.findById(id) as any);

      return response;
    } catch (error: any) {
      Logger.error('Error al editar el producto');
      throw new Error(`Error al editar el producto: ${error.message}`);
    };
  };

  // Elimino el producto 
  async deleteProduct(id: string) {
    try {
      const response = await this.product.findByIdAndDelete(id);

      return response;
    } catch (error: any) {
      Logger.error('Error al eliminar el producto');
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    };
  };

  // Query
  async query(data: ProductQueryI): Promise<ProductDTO[]> {
    try {
      let query: ProductQueryI = {};

      if (data.name) query.name = data.name;
      if (data.description) query.description = data.description;
      if (data.categoryId) query.categoryId = data.categoryId;
      if (data.price) query.price = data.price;
      if (data.stock) query.stock = data.stock;

      const product = await this.product.find(query);
      return product;
    } catch (error: any) {
      Logger.error('Error en el query de producto');
      throw new Error(`Error en el query de producto: ${error.message}`);
    };
  };
};