import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export const hash = (password: string) => {
  return bcrypt.hashSync(
    password + BCRYPT_PASSWORD,
    parseInt(SALT_ROUNDS as string)
  );
};
export const compare = (password: string, password_digest: string): boolean => {
  return bcrypt.compareSync(password + BCRYPT_PASSWORD, password_digest);
};
