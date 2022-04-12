import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { ErrorResponse } from '~/commons/errors';
import { jwtConfig } from '~/config/jwt';
import { IUser, User, validateLogin, validateRegister } from '~/models/user';
import { StdResponse } from '~/types/response';
import { EmailSchema, hashPassword } from '~/utils';

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: userAuth } = req;
    const user = await User.findById(userAuth?.id).select('-password');
    if (!user) {
      const error: ErrorResponse = {
        message: 'Bad Request',
        statusCode: 400,
      };
      return res.status(400).json({ error });
    }
    const json: StdResponse<IUser> = {
      data: user,
      message: 'Succeed',
      statusCode: 200,
    };
    return res.json(json).status(200);
  } catch (error) {
    return next(error);
  }
};

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
    const json: StdResponse<{
      _id: string;
      name: string;
      email: string;
    }> = {
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: 'Succeed',
      statusCode: 200,
    };
    return res.header(jwtConfig.responseHeader, token).json(json).status(200);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const validated = await validateLogin(body);
    const user = await User.findOne({ email: validated.email });

    const error: ErrorResponse = {
      message: 'Invalid email or password',
      statusCode: 400,
    };
    if (!user) {
      return res.status(400).json({ error });
    }
    const bool = await user.verify(validated.password);
    if (!bool) {
      return res.status(400).json({ error });
    }
    const token = await user.genAuthToken();
    const json: StdResponse<{
      _id: string;
      name: string;
      email: string;
    }> = {
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: 'Succeed',
      statusCode: 200,
    };
    return res.header(jwtConfig.responseHeader, token).json(json).status(200);
  } catch (error) {
    return next(error);
  }
};
