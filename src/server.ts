import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

//Connection Mongoose and Listeniners
async function bootstrap() {
  try {
    //Moongoose Connections
    await mongoose.connect(`${config.database_url as string}`);

    //App Listener
    app.listen(config.port, () => {
      console.log(`server is running at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
