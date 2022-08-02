import { Request, Response, NextFunction } from "express";
import { userAPI } from '../apis/user';

class UserController {
  // Funcion para mostrar todos los usuarios
  async getUsers(req: Request, res: Response) {
    res.json({
      usuarios: await userAPI.getUsers()
    });
  };

  // Funcion para mostrar un usuario segun su id
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = await userAPI.getUserById(id);

      res.json({
        data: userId
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ningun usuario con ese id'
      });
    };
  };

  // Funcion para editar un usuario segun su id
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updateUser = await userAPI.updateUser(id, req.body);

      res.json({
        msg: 'Usuario actualizado',
        data: updateUser
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ningun usuario con ese id'
      });

      next()
    }
  };

  // Funcion para borrar un usuario segun su id
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await userAPI.deleteUser(id);

      res.json({
        msg: 'Usuario eliminado'
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ningun usuario con ese id'
      });

      next();
    }
  };
};

export const userController = new UserController();