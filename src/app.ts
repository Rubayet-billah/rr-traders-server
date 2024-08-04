import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { upload } from './config/cloudunaryConfig';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// Route to handle image uploads
app.post(
  '/api/v1/upload',
  upload.single('image'),
  (req: Request, res: Response) => {
    if (req.file) {
      res.status(httpStatus.OK).json({ url: req.file.path });
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ error: 'No file uploaded' });
    }
  }
);

// Global error handler
app.use(globalErrorHandler);

// Handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
