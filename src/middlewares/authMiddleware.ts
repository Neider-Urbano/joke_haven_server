import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IUserPayload {
  id: string;
  role: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserPayload;
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.error('Access denied');
    return res.status(401).send({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Invalid token');
    res.status(400).send({ message: 'Invalid token' });
  }
}
