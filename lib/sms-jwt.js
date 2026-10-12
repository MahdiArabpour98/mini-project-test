import jwt from "jsonwebtoken";

export function smsSignJwtAccessToken(payload, expiredtTime) {
  const options = {
    expiresIn: expiredtTime,
  };
  const secret_key = process.env.SMS_JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export function smsVerifyJwt(token) {
  try {
    const secret_key = process.env.SMS_JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    return null;
  }
}
