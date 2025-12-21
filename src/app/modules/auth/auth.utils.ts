import bcrypt from "bcryptjs";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../config";

export const hashData = async (data: string) => {
  return await bcrypt.hash(data, 10);
};

export const compareData = async (data: string, hashed: string) => {
  return await bcrypt.compare(data, hashed);
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn,
  };

  return jwt.sign(payload, env.jwtSecret as Secret, options);
};
