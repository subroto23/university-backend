import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_Env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  default_password: process.env.USER_DEFAULT_PASSWORD,
  hash_random_value: process.env.HASH_RANDOM_KEY,
  jwt_Secret_key: process.env.JWT_ACCESS_SECRET,
  jwt_Access_express_key: process.env.JWT_ACCESS_EXPIRESS_IN,
  jwt_Refresh_key: process.env.JWT_REFRESH_SECRET,
  jwt_Refresh_Express_key: process.env.JWT_REFRESH_EXPIRESS_IN,
};
