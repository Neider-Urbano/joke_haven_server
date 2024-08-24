import axios from 'axios';

const API_URL = 'https://v2.jokeapi.dev/joke/Any';

export async function getJoke(): Promise<string> {
  try {
    const response = await axios.get(API_URL + '?lang=es');
    if (response.data.type === 'single') {
      return response.data.joke;
    } else {
      return `${response.data.setup} - ${response.data.delivery}`;
    }
  } catch (error) {
    console.error('Error fetching joke from JokeAPI:', error);
    throw new Error('Failed to fetch joke from JokeAPI');
  }
}
