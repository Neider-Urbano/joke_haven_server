import { getJoke } from '../utils/jokeService';

export async function getJokeFromAPI(): Promise<string> {
  try {
    const joke = await getJoke();
    return joke;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch joke from JokeAPI');
  }
}
