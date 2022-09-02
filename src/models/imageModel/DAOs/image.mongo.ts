import { MongoDBClient } from "../../../services/mongodb";
import { ImageBaseClass, ImageDTO } from "../image.interface";
import { ImageModel } from "../image.schema";
import Logger from "../../../services/logger";
import moment from "moment";

export default class ImageDAO implements ImageBaseClass {
  private static instance: ImageDAO;
  private static client: MongoDBClient;
  image: any = ImageModel;

  constructor() { };

  // Creo instancia de conexion a mongi
  static async getInstance() {
    if (!ImageDAO.instance) {
      Logger.info('Inicializamos DAO Image con Mongo Atlas');

      await MongoDBClient.getConnection();

      ImageDAO.instance = new ImageDAO();
      ImageDAO.client = MongoDBClient.getConnection();
    };
    return ImageDAO.instance;
  };

  // Agrego una imagen al producto
  async uploadImage(data: ImageDTO): Promise<ImageDTO> {
    try {
      const image: ImageDAO = new this.image({
        productId: data.productId,
        filename: data.filename,
        type: data.type,
        timestamp: moment().format('DD-MMM-YYYY HH:mm:ss')
      });

      const newImage = await this.image(image);

      await newImage.save();

      return newImage;
    } catch (error: any) {
      Logger.error('Error al agregar una imagen');
      throw new Error(`Error al agregar una imagen: ${error.message}`);
    };
  };

  // Busco una imagen por su id
  async getImage(id: string): Promise<ImageDTO> {
    try {
      const image = await this.image.findById(id);

      if (!image) throw new Error('La imagen no existe');

      return image;
    } catch (error: any) {
      Logger.error('Error al buscar la imagen');
      throw new Error(`Error al buscar la imagen: ${error.message}`);
    };
  };

  // Elimino una imagen
  async deleteImage(id: string): Promise<ImageDTO> {
    try {
      const response = await this.image.findByIdAndDelete(id);

      if (!response) throw new Error('La imagen no existe');

      return response
    } catch (error: any) {
      Logger.error('Error al eliminar la imagen');
      throw new Error(`Error al eliminar la imagen: ${error.message}`);
    };
  };
};