import { Request, Response, NextFunction } from "express";
import { userAPI } from '../apis/user';

class UserController {
  async userExists(req: Request, res: Response, next: NextFunction) {
    const user = await userAPI.getUserByEmail(req.body.email);

    if (user)
      return res.status(401).json({ msg: 'Ya existe una cuenta con ese email' });

    next();
  }

  async incompleteData(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword, firstName, lastName, admin, cellphone, country, city, street } = req.body;

    if (!email || !password || !confirmPassword || !firstName || !lastName || !cellphone || !country || !city || !street)
      return res.status(401).json({ msg: 'Campos invalidos' });

    next();
  };

  async passwordConfirmed(req: Request, res: Response, next: NextFunction) {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(401).json({ msg: 'Las contrasenias no coinciden' });

    next();
  }
}

export const userController = new UserController();