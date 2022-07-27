import express from 'express';
import * as http from 'http';
import Logger from './logger';
import mainRouter from '../routes'
import { ErrorRequestHandler } from 'express';

const app = express();
app.use(express.json());
app.use('/api', mainRouter)
app.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  })
})

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

const HTTPServer = http.createServer(app);

export default HTTPServer;