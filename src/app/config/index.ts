import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  default_password: process.env.USER_DEFAULT_PASSWORD,
  hash_random_value: process.env.HASH_RANDOM_KEY,
};
