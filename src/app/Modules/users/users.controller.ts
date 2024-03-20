import { Request, Response } from 'express';
import { UserServices } from './users.service';

const createUsers = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    // const zodParseData = userValidation.userValidationSchema.parse(studentData);

    //Services Functions Call
    const result = await UserServices.createUsersIntoDB(password);

    return res.json({
      status: 200,
      success: true,
      message: 'User created Successfully',
      data: result,
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: 'User Not created',
      data: err,
    });
  }
};

export const userController = { createUsers };
