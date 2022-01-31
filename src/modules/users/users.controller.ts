import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

import { ModelError } from '~/commons/errors';
import { IUser, User, validateUser } from '~/models/user';
import { EmailSchema, hashPassword } from '~/utils';

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res
      .json({
        data: users,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(new ModelError('User', 404));
    }
    const user = await User.findById(id);
    if (!user) {
      return next(new ModelError('User', 404));
    }
    return res
      .json({
        data: user,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
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
    const validated = await validateUser(body, uniqueUser);
    const userBody: IUser = {
      name: validated.name,
      email: validated.email,
      isAdmin: validated.isAdmin || false,
      isGold: validated.isGold || false,
      isSuspended: validated.isSuspended || false,
    };
    if (validated.password) {
      userBody.password = await hashPassword(validated.password);
    }
    if (validated.address) {
      userBody.address = validated.address;
    }
    if (validated.phone) {
      userBody.phone = validated.phone;
    }
    const user = await User.create(userBody);
    return res
      .json({
        data: user,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request',
          statusCode: 400,
        },
      });
    }

    const uniqueUser = z.object({
      email: EmailSchema.refine(
        async (v) => {
          const found = await User.findOne({ email: v, _id: { $nin: [id] } });
          return !found;
        },
        { message: 'The email has already been taken.' }
      ),
    });
    const validated = await validateUser(body, uniqueUser);
    const userBody: IUser = {
      name: validated.name,
      email: validated.email,
      isAdmin: validated.isAdmin || false,
      isGold: validated.isGold || false,
      isSuspended: validated.isSuspended || false,
    };
    if (validated.password) {
      userBody.password = await hashPassword(validated.password);
    }
    if (validated.address) {
      userBody.address = validated.address;
    }
    if (validated.phone) {
      userBody.phone = validated.phone;
    }
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: userBody,
      },
      { new: true }
    );
    return res
      .json({
        data: user,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(new ModelError('User', 404));
    }
    const result = await User.findByIdAndDelete(id);
    return res
      .json({
        data: result !== null,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};
