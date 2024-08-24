import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users';
import jokeRoutes from './routes/jokes';
import { overrideConsole } from './logger';

dotenv.config();
overrideConsole();

const app: Application = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Welcome api on jokes 👋' });
});

app.use('/api/users', userRoutes);
app.use('/api/jokes', jokeRoutes);

app.use('*', (_, res) => {
  res
    .status(404)
    .json({ message: 'The resource you are looking for does not exist.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
