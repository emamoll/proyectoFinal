import { Request, Response, NextFunction } from "express";
import { userAPI } from '../apis/user';

class UserController {
  // Funcion para comprobar que el mail para registrarse no exista
  async userExists(req: Request, res: Response, next: NextFunction) {
    const user = await userAPI.getUserByEmail(req.body.email);

    if (user)
      return res.status(401).json({ msg: 'Ya existe una cuenta con ese email' });

    next();
  }

  // Funcion para solicitar que se completen todos los campos para registrarse
  async incompleteData(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword, firstName, lastName, admin, cellphone, country, city, street } = req.body;

    if (!email || !password || !confirmPassword || !firstName || !lastName || !cellphone || !country || !city || !street)
      return res.status(401).json({ msg: 'Campos invalidos' });

    next();
  };

  // Funcion para comprobar que las contrasenias que se ingresan son iguales
  async passwordConfirmed(req: Request, res: Response, next: NextFunction) {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(401).json({ msg: 'Las contrasenias no coinciden' });

    next();
  }
}

export const userController = new UserController();