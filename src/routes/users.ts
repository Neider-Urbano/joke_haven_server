import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
import authMiddleware from '../middlewares/authMiddleware';

dotenv.config();

const router = Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const userExisting = await User.findOne({ email });

    if (userExisting) {
      throw new Error('User exist');
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      await user.save();
      res.status(200).json({ message: 'User registered successfully.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    } else {
      console.error('Internal server error');
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const user = await User.findOne({ email });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );
        res.json({ token });
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    } else {
      console.error('Internal server error');
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      throw new Error('Access denied: User not found');
    }

    const user = await User.findById(req.user.id).select([
      '-password',
      '-role'
    ]);

    if (user) {
      return res.status(200).json({ user: user });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    } else {
      console.error('Internal server error');
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

export default router;
