/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
import cookieParser from 'cookie-parser';
import router from './app/routes';
const app: Application = express();

//MiddleWate
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//ALL Routes
app.use('/api/v1', router);

//Global Error Handler
app.use(globalErrorHandler);

//Not Found MiddleWare
app.use(notFoundRoute);

export default app;
