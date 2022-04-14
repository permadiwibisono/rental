import { User } from '~/models/user';

export const findUserLogin = async (id: string, email: string) => {
  return User.findOne({ _id: id, email }).select('-password');
};
