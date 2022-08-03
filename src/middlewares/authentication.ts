import passport from 'passport';
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest, VerifyFunctionWithRequest } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { userAPI } from '../apis/user';
import Logger from '../services/logger';
import { notifyNewUserByEmail } from '../services/twilio';

// Strategy options para las funciones de login y signup
const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}

// Funcion de login
const login: VerifyFunctionWithRequest = async (req: Request, email: string, password: string, done: any) => {
  const user = await userAPI.getUserByEmail(email);
  const isValidPassword = await userAPI.validatePassword(user, password);

  // Si no existe el usuario o no es valida la contrasenia no inicia la sesion
  if (!user || !isValidPassword) {
    Logger.info('Error al iniciar sesion');

    return done(null, false, { message: 'Email o contrasenia incorrectos' });
  }

  Logger.info(`Inicio de sesion de: ${email}`);

  return done(null, user);
}

// Funcion de signup
const signup: VerifyFunctionWithRequest = async (req: Request, email: string, password: string, done: any) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, age, admin, cellphone, country, city, street, timestamp } = req.body;
    const user = { email, password, confirmPassword, firstName, lastName, age, admin, cellphone, country, city, street, timestamp };
    const userEmail = await userAPI.getUserByEmail(email);

    // Compruebo que el email no exista
    if (userEmail) {
      Logger.error('Ya existe una cuenta con ese email');
      Logger.info(userEmail);

      return done(null, false, { message: 'Ya existe una cuenta con ese email' });
    };

    // Pido que se completen todos los campos
    if (!email || !password || !confirmPassword || !firstName || !lastName || !age || !cellphone || !country || !city || !street) {
      Logger.error('Campos invalidos');

      return done(null, false, { msg: 'Campos invalidos' })
    };

    // Compruebo que el nuevo usuario sea mayor de 18 anios
    if (age < 18) {
      Logger.error('Se necesita ser mayor de 18 para registrarse');

      return done(null, false, { msg: 'Se necesita ser mayor de 18 para registrarse' })
    }

    // Comparo la contrasenia con la confirmacion de contrasenia
    if (password !== confirmPassword) {
      Logger.error('Las contrasenias no coinciden');

      return done(null, false, { msg: 'Las contrasenias no coinciden' });
    }

    // Si pasa todos los middlewares anteriores creo el usuario
    const newUser = await userAPI.createUser(user);

    Logger.info('Nuevo usuario creado');
    Logger.info(newUser);

    notifyNewUserByEmail(newUser);

    return done(null, newUser);
  } catch (error: any) {
    Logger.error('Error al crear el usuario');
    Logger.error(error);

    return done(null, false, { message: error.message });
  };
};

export const signUpFunc = new LocalStrategy(strategyOptions, signup);
export const loginFunc = new LocalStrategy(strategyOptions, login);

passport.serializeUser((user: any, done) => {
  done(null, user.email);
});

passport.deserializeUser((email: string, done) => {
  userAPI.getUserByEmail(email).then((user) => {
    return done(null, user);
  })
})

export default passport;