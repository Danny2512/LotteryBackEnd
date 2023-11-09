import jwt from 'jsonwebtoken';
import config from "../../config/default";
const secretKey = config.jwtkey;

export function generateToken(claims, expirationTimeInSeconds) {
  return jwt.sign(claims, secretKey, { expiresIn: expirationTimeInSeconds });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}