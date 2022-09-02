import Config from "../config";
import { ImageFactoryDAO } from "../models/imageModel/DAOs/image.factory";
import { ImageDTO } from "../models/imageModel/image.interface";
import { MongoDBClient } from "../services/mongodb";

class ImageAPI {
  image;

  constructor() {
    // Instancia de conexion a mongoDB
    this.image = ImageFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para subir una imagen
  async uploadImage(data: ImageDTO) {
    const newImage = await this.image.uploadImage(data);
    return newImage;
  };

  // Funcion para buscar una imagen por su id
  async getImage(id: string) {
    const image = await this.image.getImage(id);
    return image;
  };

  // Funcion para eliminar una imagen
  async deleteImage(id: string) {
    const image = await this.image.deleteImage(id);
  };
};

export const imageAPI = new ImageAPI();