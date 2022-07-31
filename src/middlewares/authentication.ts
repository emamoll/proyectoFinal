import passport from 'passport';
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest, VerifyFunctionWithRequest } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { userAPI } from '../apis/user';
import Logger from '../services/logger';
import { notifyNewUserByEmail } from '../services/twilio';

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}

const signup: VerifyFunctionWithRequest = async (req: Request, email: string, password: string, done: any) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, admin, cellphone, country, city, street } = req.body;
    const user = { email, password, confirmPassword, firstName, lastName, admin, cellphone, country, city, street };
    const userEmail = await userAPI.getUserByEmail(email);

    if (userEmail) {
      Logger.error('Ya existe una cuenta con ese email');
      Logger.info(userEmail);

      return done(null, false, { message: 'Ya existe una cuenta con ese email' });
    };

    if (!email || !password || !confirmPassword || !firstName || !lastName || !cellphone || !country || !city || !street) {
      Logger.error('Campos invalidos');

      return done(null, false, { msg: 'Campos invalidos' })
    };

    if (password !== confirmPassword) {
      Logger.error('Las contrasenias no coinciden');

      return done (null, false, {msg: 'Las contrasenias no coinciden'});
    }

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

passport.serializeUser((user: any, done) => {
  done(null, user.email);
});

passport.deserializeUser((email: string, done) => {
  userAPI.getUserByEmail(email).then((user) => {
    return done(null, user);
  })
})


export default passport;