import { Request, Response, NextFunction } from 'express';
import { userAPI } from '../apis/user';

class AuthController {
  // Funcion de bienvenida de la route login
  async getLogin(req: Request, res: Response) {
    res.status(200).json({
      msg: 'Ingrese su email y contrasenia'
    });
  };

  // Funcion para mostrar que el usuario inicio sesion
  async postLogin(req: Request, res: Response) {
    res.status(200).json({
      msg: 'Iniciaste sesion'
    });
  };

  // Funcion de bienvenida de la route signup
  async getSignup(req: Request, res: Response) {
    res.status(200).json({
      msg: 'Complete todos los campos para registrarse'
    });
  };

  // Funcion para mostrar que se registro el usuario
  async postSignup(req: Request, res: Response) {
    res.status(200).json({
      msg: 'Usuario creado',
    });
  }

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
      return res.status(401).json({ msg: 'Campos incompletos' });

    next();
  };

  // Funcion para comprobar que el usuario que se registra sea mayor de 18
  async userLegal(req: Request, res: Response, next: NextFunction) {
    const { age } = req.body

    if (age < 18)
      return res.status(401).json({ msg: 'Se necesita ser mayor de 18 para registrarse' });

    next();
  }

  // Funcion para comprobar que las contrasenias que se ingresan son iguales
  async passwordConfirmed(req: Request, res: Response, next: NextFunction) {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(401).json({ msg: 'Las contrasenias no coinciden' });

    next();
  };

  // Funcion para cerrar la sesion
  async logout(req: Request, res: Response) {
    req.session.destroy((error) => {
      if (error) {
        return error;
      }
      res.status(200).json({
        msg: 'Cerraste sesion'
      })
    })
  }
}

export const authController = new AuthController();