/* eslint-disable @typescript-eslint/no-namespace */
import { JwtPayload } from 'jsonwebtoken';
import { userRole } from '../Modules/users/user.consttant';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export type TUserRole = keyof typeof userRole;
