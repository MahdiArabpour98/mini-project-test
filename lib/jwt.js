import { sign } from "jsonwebtoken";

export const signJWTAccessToken = (payload, expiredTime) => {
  const options = {
    expiredIn: expiredTime,
  };

  const token = sign(payload, process.env.SMS_JWT_SECRET_KEY);
  return token;
};
