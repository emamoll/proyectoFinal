import express from 'express';
import * as http from 'http';
import Logger from './logger';
import mainRouter from '../routes';
import passport from 'passport';
import session from 'express-session';
import { ErrorRequestHandler } from 'express';
import { signUpFunc } from '../middlewares/authentication';
import MongoStore from 'connect-mongo';
import Config from '../config';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Logger.error(`Hubo un error ${err.message}`);

  const status = err.statusCode || 500;
  const msg = err.message || 'Internal Server Error';
  const stack = err.stack;

  Logger.error(err);

  res.status(status).send({
    msg,
    stack
  })
}

app.use(errorHandler);

const hora = 1000 * 60 * 600
const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_SRV,
    crypto: {
      secret: 'shhh'
    }
  }),
  secret: 'shhh',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: hora
  }
}
app.use(cookieParser());
app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use('signup', signUpFunc);

app.use('/api', mainRouter);

app.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  })
})

const HTTPServer = http.createServer(app);

export default HTTPServer;