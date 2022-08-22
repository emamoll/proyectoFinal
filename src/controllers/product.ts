import { Request, Response, NextFunction } from "express";
import { productAPI } from "../apis/product";
import { ProductQueryI } from "../models/product/product.interface";
import { NewProductJoiSchema, ProductJoiSchema } from "../models/product/product.shema";
import Logger from "../services/logger";

class ProductController {
  // Valido campos para crear un producto
  async validProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const joiProduct = await ProductJoiSchema.validate(req.body);

      if (joiProduct.error) {
        return res.status(400).json({
          msg: joiProduct.error.details[0].message
        });
      };

      next();
    } catch (error: any) {
      res.status(400).json({
        msg: 'Campos incompletos'
      });
    };
  };

  // Valido los campos para editar el producto
  async validProductUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const joiProduct = await NewProductJoiSchema.validate(req.body);

      if (joiProduct.error) {
        return res.status(400).json({
          msg: joiProduct.error.details[0].message
        });
      };

      next();
    } catch (error: any) {
      res.status(400).json({
        msg: 'Campos incompletos'
      });
    };
  };

  // Valido el id ingresado por parametro
  async validId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          msg: 'Parametros invalidos'
        });
      };

      const product = await productAPI.getProducts(id);

      if (product.length < 1) {
        return res.status(404).json({
          msg: 'El id no es valido'
        });
      };

      next();
    } catch (error: any) {
      res.status(404).json({
        msg: 'El id no es valido'
      });
    };
  };

  // Valido la categoria ingresada por parametro
  async validCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;

      if (!category) {
        return res.status(400).json({
          msg: 'Parametros invalidos'
        });
      };

      next();
    } catch (error: any) {
      res.status(404).json({
        msg: 'La categoria no es valida'
      });
    };
  };

  // Modifico el stock en el caso de una compra
  async stockUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, amount } = req.body;

      if (typeof Number(amount) !== 'number') {
        return res.status(400).json({
          msg: 'La cantidad ingresada no es valida'
        });
      };

      const product = await productAPI.getProducts(productId);

      if (product.length < 1) {
        return res.status(404).json({
          msg: 'El producto no existe'
        });
      };

      if (product[0].stock < amount) {
        return res.status(400).json({
          msg: 'No hay stock'
        });
      };

      Logger.info(`Se modifico el stock del producto ${productId}`);

      await productAPI.updateProduct(productId, { stock: product[0].stock - Number(amount) });

      next();
    } catch (error: any) {
      res.status(404).json({
        msg: error.message
      });
    };
  };

  // Modifico el stock en el caso de una compra
  async stockUpdateRemove(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, amount } = req.body;

      if (typeof Number(amount) !== 'number') {
        return res.status(400).json({
          msg: 'La cantidad ingresada no es valida'
        });
      };

      const product = await productAPI.getProducts(productId);

      if (product.length < 1) {
        return res.status(404).json({
          msg: 'El producto no existe'
        });
      };

      if (product[0].stock < amount) {
        return res.status(400).json({
          msg: 'No hay stock'
        });
      };

      Logger.info(`Se modifico el stock del producto ${productId}`);

      await productAPI.updateProduct(productId, { stock: product[0].stock + Number(amount) });

      next();
    } catch (error: any) {
      res.status(404).json({
        msg: error.message
      });
    };
  };

  // Funcion para crear un producto
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const newProduct = await productAPI.createProduct(req.body);

      res.status(200).json({
        msg: 'El producto fue creado',
        newProduct
      })
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    }
  }
  // Funcion para mostrar todos los productos
  async getProducts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, categoryId, price, stock } = req.query;

      if (id) {
        const product = await productAPI.getProducts(id);

        if (!product) {
          res.status(404).json({
            msg: 'El producto no existe'
          });
        };

        return res.status(200).json({
          data: product
        });
      };

      const query: ProductQueryI = {};

      if (name) query.name = name.toString();
      if (description) query.description = description.toString();
      if (categoryId) query.categoryId = categoryId.toString();
      if (price) query.price = Number(price);
      if (stock) query.stock = Number(stock);
      if (Object.keys(query).length) {
        const productQuery = await productAPI.query(query);

        return res.status(200).json({
          data: productQuery
        });
      };

      const products = await productAPI.getProducts();

      return res.status(200).json({
        data: products
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    }
  };

  // Funcion para buscar los productos segun la categoria
  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const products = await productAPI.getProductsByCategory(category);

      if (products.length < 1) {
        return res.status(404).json({
          data: products
        });
      };

      return res.status(200).json({
        data: products
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para editar un producto segun su id
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateProduct = await productAPI.updateProduct(id, req.body);

      res.status(200).json({
        msg: 'Producto actualizado',
        data: updateProduct
      });
    } catch (error: any) {
      res.status(404).json({
        msg: error.message
      });
    }
  };

  // Funcion para borrar un producto segun su id
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await productAPI.deleteProduct(id);

      res.status(200).json({
        msg: 'Producto eliminado'
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    }
  };
};

export const productController = new ProductController();