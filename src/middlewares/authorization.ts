import { Request, Response, NextFunction } from "express";
import Logger from "../services/logger";

// Funcion para asegurarse que el usuario inicie sesion
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  Logger.info('Esta autenticando');
  Logger.info(req.isAuthenticated());

  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'No esta autorizado, inicie sesion' });

  next();
};

// Funcion solo para administradores
export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  Logger.info(`Es el administrador: ${req.user.firstName} ${ req.user.lastName}`);

  if (!req.user.admin)
    return res.status(401).json({ msg: 'No esta autorizado, solamente administradores' });

  next();
};
