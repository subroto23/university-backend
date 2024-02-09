import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

//MiddleWate
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Home Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hellow World');
});

//Eroor Route Globale Handle
app.all('*', (req: Request, res: Response) => {
  res.status(404).send('Route not found');
});

export default app;
