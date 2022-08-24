import { Request, Response, NextFunction } from "express";
import { userAPI } from '../apis/user';
import { checkAuth } from "../middlewares/authentication";
import { UserJoiSchema } from "../models/user/user.schema";
import Logger from "../services/logger";
import { generateAuthToken } from '../middlewares/authentication'
import { notifyNewUserByEmail, notifyNewUserRegistration } from "../services/twilio";
import { UserDTO } from "../models/user/user.interface";

interface RequestUser extends Request {
  user?: UserDTO;
};

class UserController {
  // Funcion para el get de login
  async getLogin(req: Request, res: Response) {
    res.status(200).json({
      msg: 'Ingrese su email y contrasenia para iniciar sesion'
    });
  };

  // Funcion para loguear un usuario
  async login(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await userAPI.query(email);
      const token = await generateAuthToken(user);

      res.header('x-auth-token', token).status(200).json({
        msg: `Te damos la bienvenida ${user.firstName}`,
        token
      });

    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para el get de signup
  async getSignup(req: Request, res: Response) {
    res.status(200).json({
      msg: 'Complete los campos para registrarse'
    });
  };

  // Funcion para registrar un usuario
  async signup(req: Request, res: Response) {
    if (!req.body || req.body.email === undefined
      || req.body.password === undefined
      || req.body.confirmPassword === undefined
      || req.body.firstName === undefined
      || req.body.lastName === undefined
      || req.body.age === undefined
      || req.body.address === undefined
      || req.body.cellphone === undefined) {
      Logger.error('No completo los campos para el registro')
      return res.status(400).json({ msg: 'Campos incompletos' });
    }
    try {
      const joiUser = await UserJoiSchema.validate(req.body);

      if (joiUser.error) {
        return res.status(400).json({
          msg: joiUser.error.details[0].message
        });
      };

      const newUser = await userAPI.signup(req.body);

      Logger.info('Nuevo usuario creado');
      Logger.info(newUser);

      notifyNewUserByEmail(newUser);
      notifyNewUserRegistration(newUser);

      return res.status(200).json({
        msg: 'Registro con exito'
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para validar el usuario y la contrasenia
  async validUserAndPassword(req: Request, res: Response, next: NextFunction) {
    if (!req.body || req.body.email === undefined || req.body.password === undefined) {
      Logger.error('No completo los campos para el login');
      return res.status(400).json({ msg: 'Campos incompletos' });
    };

    let { email, password } = req.body;

    try {
      const user = await userAPI.query(email);

      if (!user) {
        Logger.error(`El email ${email} es incorrecto`);
        return res.status(400).json({
          msg: 'El email ingresado es incorrecto'
        });
      };

      const validPassword = await userAPI.validatePassword(user, password);

      if (!validPassword) {
        Logger.error('La contrasenia es incorrecta');
        return res.status(400).json({
          msg: 'La contrasenia es incorrecta'
        });
      };

      next();
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para comprobar que no exista el email para registrarse
  async existsEmail(req: Request, res: Response, next: NextFunction) {
    if (!req.body || req.body.email === undefined) {
      Logger.error('No completo el campo de email');
      return res.status(400).json({ msg: 'Campos incompletos' });
    };

    const { email } = req.body;

    const user = await userAPI.query(email);

    if (user) {
      Logger.error('El email ya existe');
      return res.status(400).json({
        msg: 'El email ya existe'
      });
    }
    next();
  };

  // Funcion para comparar que las dos contrasenias ingresadas sean iguales
  async comparePassword(req: Request, res: Response, next: NextFunction) {
    if (!req.body || req.body.password === undefined || req.body.confirmPassword === undefined) {
      Logger.error('No completo los campos de password');
      return res.status(400).json({ msg: 'Campos incompletos' });
    };

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      Logger.error('Las contrasenias no coinciden');
      return res.status(400).json({
        msg: 'Las contrasenias no coinciden'
      });
    }

    next();
  };

  // Funcion para validar que el usuario nuevo sea mayor de 18 anios
  async userLegal(req: Request, res: Response, next: NextFunction) {
    if (!req.body || req.body.age === undefined) {
      Logger.error('No completo el campo de edad');
      return res.status(400).json({ msg: 'Campos incompletos' });
    };

    const { age } = req.body;

    if (age < 18) {
      Logger.error('Debe ser mayor de edad para registrarse');
      return res.status(400).json({
        msg: 'Debe ser mayor de edad para registrarse'
      });
    };

    next();
  };

  // Funcion para chequear que el usuario este autenticado
  async UserCheckAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-auth-token'];

    if (!token) {
      Logger.error('No tiene token!');
      return res.status(400).json({
        msg: 'No estas autorizado'
      });
    };

    const user = await checkAuth(token);

    if (!user) {
      Logger.error('Token invalido!');
      return res.status(400).json({
        msg: 'No estas autorizado'
      });
    };

    req.user = user;

    Logger.info('Esta autorizado');

    next();
  };

  // Funcion de data segura
  async secureData(req: Request, res: Response) {
    res.status(200).json({
      msg: 'Llegaste a la data segura'
    });
  }

  // Funcion para mostrar todos los usuarios
  async getUsers(req: Request, res: Response) {
    res.status(200).json({
      usuarios: await userAPI.getUsers()
    });
  };

  // Funcion para mostrar un usuario segun su id
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = await userAPI.getUserById(id);

      res.status(200).json({
        data: userId
      });
    } catch (error) {
      res.status(404).json({
        msg: 'No existe ningun usuario con ese id'
      });
    };
  };

  // Funcion para borrar un usuario segun su id
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await userAPI.deleteUser(id);

      res.status(200).json({
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