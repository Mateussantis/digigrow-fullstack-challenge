import 'reflect-metadata';
import '@/domain/tasks/containers/index';
import 'express-async-errors';
import SwaggerFile from '@/shared/http/swagger/swagger.json';
import cors from 'cors';
import express, {
  type Request,
  type Response,
  type NextFunction
} from 'express';
import SwaggerUi from "swagger-ui-express";
import { AppError } from '../errors';
import { routes } from './routes';

const app = express();

app.use(cors())

app.use(express.json());
app.use(routes);

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerFile));


app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err.message);
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
