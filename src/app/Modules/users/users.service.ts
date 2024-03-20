import config from '../../config';
import { TNewUser } from './users.interface';
import { UserModel } from './users.model';

const createUsersIntoDB = async (password: string) => {
  //create user object
  const user: TNewUser = {};

  // if password is not given by frontend , use default password
  user.password = password || (config.default_password as string);

  //user Role Create
  user.role = 'student';

  //Use Manually Generated Id
  user.id = '2024010001';
  //Create a User
  const result = await UserModel.create(user);
  return result;
};
export const UserServices = {
  createUsersIntoDB,
};
