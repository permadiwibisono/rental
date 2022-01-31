import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { IUser, User, validateLogin, validateRegister } from '~/models/user';
import { EmailSchema, hashPassword, verifyPassword } from '~/utils';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const uniqueUser = z.object({
      email: EmailSchema.refine(
        async (v) => {
          const found = await User.findOne({ email: v });
          return !found;
        },
        { message: 'The email has already been taken.' }
      ),
    });
    const validated = await validateRegister(body, uniqueUser);
    const userBody: IUser = {
      name: validated.name,
      email: validated.email,
      password: await hashPassword(validated.password),
      isAdmin: false,
      isGold: false,
      isSuspended: false,
    };
    await User.create(userBody);
    return res
      .json({
        data: true,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const validated = await validateLogin(body);
    const user = await User.findOne({ email: validated.email });
    if (!user) {
      return res.status(400).json({
        error: {
          message: 'Invalid email or password',
          statusCode: 400,
        },
      });
    }
    const bool = await verifyPassword(validated.password, user.password || '');
    if (!bool) {
      return res.status(400).json({
        error: {
          message: 'Invalid email or password',
          statusCode: 400,
        },
      });
    }
    return res
      .json({
        data: true,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};
