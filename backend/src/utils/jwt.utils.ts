import jwt from 'jsonwebtoken';

export const generateToken = (payload: { id: string; email: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30m',
  });
};

export const verifyToken = (token: string): { id: string; email: string } => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
};
