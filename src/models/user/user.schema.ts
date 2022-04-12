import { Document, Model, model, Schema } from 'mongoose';

import { jwtSign, verifyPassword } from '~/utils';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  isGold: boolean;
  isAdmin: boolean;
  isSuspended: boolean;
}

export interface UserDoc extends IUser, Document {
  verify(plainText: string): Promise<boolean>;
  genAuthToken(): Promise<string>;
}
export interface UserModel extends Model<UserDoc> {}

export const userSchema = new Schema<UserDoc, UserModel>(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true,
    },
    password: {
      type: String,
      minLength: 5,
      maxLength: 1024,
    },
    phone: {
      type: String,
      minLength: 5,
      maxLength: 80,
    },
    address: {
      type: String,
      minLength: 5,
      maxLength: 255,
    },
    isGold: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.genAuthToken = function (this: UserDoc) {
  return jwtSign(this._id, {
    email: this.email,
    name: this.name,
  });
};
userSchema.methods.verify = function (this: UserDoc, plainText: string) {
  return verifyPassword(plainText, this.password || '');
};

export const User = model<UserDoc, UserModel>('User', userSchema);
