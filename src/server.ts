/* eslint-disable no-console */
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

//Connection Mongoose and Listeniners
async function bootstrap() {
  try {
    //Moongoose Connections
    await mongoose.connect(`${config.database_url as string}`);
      console.log("Mongodb Connection Successfully")
    //App Listener
    app.listen(config.port, () => {
      console.log(`server is running at http://localhost:${config.port}`);
      console.log("Mongodb Connection Successfully")
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
