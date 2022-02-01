import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { jwtConfig } from '~/config/jwt';
import { IUser, User, validateLogin, validateRegister } from '~/models/user';
import { EmailSchema, hashPassword } from '~/utils';

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
    const user = await User.create(userBody);
    const token = await user.genAuthToken();
    return res
      .header(jwtConfig.responseHeader, token)
      .json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
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
    const bool = await user.verify(validated.password);
    if (!bool) {
      return res.status(400).json({
        error: {
          message: 'Invalid email or password',
          statusCode: 400,
        },
      });
    }
    const token = await user.genAuthToken();
    return res
      .header(jwtConfig.responseHeader, token)
      .json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};
