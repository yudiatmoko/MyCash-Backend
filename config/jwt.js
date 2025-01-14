import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '48h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
