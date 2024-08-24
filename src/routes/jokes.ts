import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { getJokeFromAPI } from '../controllers/jokesController';
import Joke from '../models/Joke';

const router = Router();

router.get('/random', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Access denied: User not found');
    }
    const joke = await getJokeFromAPI();
    res.status(200).json({ joke: joke });
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

router.post(
  '/favorites',
  authMiddleware,
  async (req: Request, res: Response) => {
    const { joke } = req.body;

    if (!req.user) {
      throw new Error('Access denied: User not found');
    }

    if (!joke || joke.length < 5) {
      throw new Error('Unsaved joke');
    }

    try {
      const newJoke = new Joke({
        userId: req.user.id,
        joke
      });
      await newJoke.save();
      res.status(200).send({ message: 'Joke saved to favorites' });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(400).send({ message: error.message });
      } else {
        console.error('Internal server error');
        res.status(500).send({ message: 'Internal server error' });
      }
    }
  }
);

router.get(
  '/favorites',
  authMiddleware,
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error('Access denied: User not found');
    }

    try {
      const favoriteJokes = await Joke.find({ userId: req.user.id });
      console.log(favoriteJokes);
      res.status(200).json({ jokes: favoriteJokes });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        console.error('Internal server error');
        res.status(500).send({ message: 'Internal server error' });
      }
    }
  }
);

router.delete(
  '/favorites/:jokeId',
  authMiddleware,
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error('Access denied: User not found');
    }

    const { jokeId } = req.params;

    try {
      const joke = await Joke.findOneAndDelete({
        _id: jokeId,
        userId: req.user.id
      });

      if (!joke) {
        throw new Error(
          'Joke not found or you do not have permission to delete it'
        );
      }

      res.status(200).send({ message: 'Joke deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(400).send({ message: error.message });
      } else {
        console.error('Internal server error');
        res.status(500).send({ message: 'Internal server error' });
      }
    }
  }
);

export default router;
