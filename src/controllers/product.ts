import { Request, Response, NextFunction } from "express";
import { productAPI } from "../apis/product";

class ProductController {
   // Funcion para crear un producto
   async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await productAPI.createProduct(req.body);

      res.status(200).json({
        msg: 'El producto fue creado',
        data
      })
    } catch (error) {
      res.status(404).json({
        msg: 'No se pudo crear el producto'
      });

      next()
    }
  }
  // Funcion para mostrar todos los productos
  async getProducts(req: Request, res: Response) {
    res.status(200).json({
      productos: await productAPI.getProducts()
    });
  };

  // Funcion para mostrar un producto segun su id
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const productId = await productAPI.getProductById(id);

      res.status(200).json({
        data: productId
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ningun producto con ese id'
      });

      next()
    };
  };

  // Funcion para editar un producto segun su id
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updateProduct = await productAPI.updateProduct(id, req.body);

      res.status(200).json({
        msg: 'Producto actualizado',
        data: updateProduct
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ningun producto con ese id'
      });

      next()
    }
  };

  // Funcion para borrar un producto segun su id
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await productAPI.deleteProduct(id);

      res.status(200).json({
        msg: 'Producto eliminado'
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ningun producto con ese id'
      });

      next();
    }
  };
};

export const productController = new ProductController();