import { sign, verify } from "jsonwebtoken";

export const signJWTAccessToken = (payload, expiredTime) => {
  const options = {
    expiresIn: expiredTime,
  };

  const token = sign(payload, process.env.SMS_JWT_SECRET_KEY, options);
  return token;
};

export const verifyJWT = (token) => {
  try {
    const decoded = verify(token, process.env.SMS_JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    return error;
  }
};
