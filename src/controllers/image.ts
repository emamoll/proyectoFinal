import { Request, Response, NextFunction } from "express";
import { imageAPI } from "../apis/image";
import { productAPI } from "../apis/product";
import { ImageJoiSchema } from "../models/imageModel/image.schema";
import { ProductDTO } from "../models/product/product.interface";

class ImageController {
  // Validos los campos para subir la imagen
  async validImage(req: Request, res: Response, next: NextFunction) {
    try {
      const joiImage = await ImageJoiSchema.validate(req.body);

      if (joiImage.error) {
        return res.status(400).json({
          msg: joiImage.error.details[0].message
        });
      };

      next();
    } catch (error: any) {
      res.status(400).json({
        msg: 'Campos incompletos'
      });
    };
  };

  // Funcion para subir una imagen nueva
  async uploadImage(req: Request, res: Response) {
    try {
      const { productId, filename, type } = req.body;
      const imageUpload: any = await imageAPI.uploadImage(req.body);

      if (type !== 'JPG') {
        res.status(400).json({
          msg: 'El tipo de imagen no es valido'
        });
      };

      const product = await productAPI.getProducts(productId);

      if (!product) {
        res.status(404).json({
          msg: 'El producto no existe'
        });
      };

      const imageProduct = [...product[0].image, imageUpload];
      const productUpdated = await productAPI.updateProduct(productId, { image: imageProduct });

      return res.status(200).json({
        msg: 'La foto fue cargada',
        data: imageUpload,
        item: productUpdated
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para buscar una imagen
  async getImage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const image = await imageAPI.getImage(id);

      if (!id) {
        return res.status(404).json({
          msg: 'La imagen no existe'
        });
      };

      return res.status(200).json({
        data: image
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para eliminar una imagen
  async deleteImage(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await imageAPI.deleteImage(id);

      return res.status(200).json({
        msg: 'Imagen eliminada'
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };
};

export const imageController = new ImageController();