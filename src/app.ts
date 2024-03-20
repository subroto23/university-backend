import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/Modules/users/users.route';
import { studentRouter } from './app/Modules/students/students.route';
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

//Eroor Route Globale Handle
app.all('*', (req: Request, res: Response) => {
  res.status(404).send('Route not found');
});
export default app;
