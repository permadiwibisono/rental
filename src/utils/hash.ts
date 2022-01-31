import bcrypt from 'bcrypt';

export const hashPassword = async (plainText: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
};

export const verifyPassword = (plainText: string, hashed: string) => bcrypt.compare(plainText, hashed);
