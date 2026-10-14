import jwt from "jsonwebtoken";

export function signJwtAccessToken(payload, expiresIn) {
  const options = {
    expiresIn,
  };
  const secret_key = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export function verifyJwt(token) {
  try {
    const secret_key = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    return null;
  }
}
