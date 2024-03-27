/* eslint-disable no-console */
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;
//Connection Mongoose and Listeniners
async function bootstrap() {
  try {
    //Moongoose Connections
    await mongoose.connect(`${config.database_url as string}`);
    console.log('Mongodb Connection Successfully');
    //App Listener
    server = app.listen(config.port, () => {
      console.log(`server is running at http://localhost:${config.port}`);
      console.log('Mongodb Connection Successfully');
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection is detected , shutting down ...');
  //For Asynchronous operations
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Unhandled Exception is detected , shutting down ...');
  //For Synchronous operations
  process.exit(1);
});
