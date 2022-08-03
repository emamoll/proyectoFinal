import { Request, Response, NextFunction } from "express";
import { categoryAPI } from "../apis/category";

class CategoryController {
  // Funcion para crear una categoria
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await categoryAPI.createCategory(req.body);

      res.status(200).json({
        msg: 'La categoria fue creada',
        data
      })
    } catch (error) {
      res.status(404).json({
        msg: 'No se pudo crear la categoria'
      });

      next()
    }
  }

  // Funcion para mostrar todas las categorias
  async getCategories(req: Request, res: Response) {
    res.json({
      categorias: await categoryAPI.getCategories()
    });
  };

  // Funcion para mostrar una categoria segun su id
  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const categoryId = await categoryAPI.getCategoryById(id);

      res.json({
        data: categoryId
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ninguna categoria con ese id'
      });

      next()
    };
  };

  // Funcion para mostrar una categoria segun su nombre
  async getCategoryByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const categoryName = await categoryAPI.getCategoryByName(name);

      res.json({
        data: categoryName
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ninguna categoria con ese id'
      });

      next()
    };
  };

  // Funcion para editar una categoria segun su id
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updateCategory = await categoryAPI.updateCategory(id, req.body);

      res.json({
        msg: 'Categoria actualizada',
        data: updateCategory
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ninguna categoria con ese id'
      });

      next()
    }
  };

  // Funcion para borrar una categoria segun su id
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await categoryAPI.deleteCategory(id);

      res.json({
        msg: 'Categoria eliminada'
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ninguna categoria con ese id'
      });

      next();
    };
  };
};

export const categoryController = new CategoryController();