import { secret } from 'config';
import jwt from 'jsonwebtoken';

export const generateToken = async (payload: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    jwt.sign(
      { ...(payload || {}) },
      secret,
      {
        expiresIn: 60 * 60 * 24,
      },
      (err, token) => {
        if (err) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          reject(new Error(err.message));
        } else {
          resolve(token as string);
        }
      },
    );
  });
};

export const verifyToken = async <T extends object>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as T);
      }
    });
  });
};
