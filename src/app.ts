/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/Modules/users/users.route';
import { studentRouter } from './app/Modules/students/students.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
const app: Application = express();

//MiddleWate
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all Routes
app.use('/api/v1', UserRoutes);

//all Students Router
app.use('/api/v1', studentRouter);

//Home Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hellow World');
});

//Global Error Handler
app.use(globalErrorHandler);

//Not Found MiddleWare
app.use(notFoundRoute);
//
export default app;
