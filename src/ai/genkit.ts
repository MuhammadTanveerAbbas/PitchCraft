import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey || apiKey.trim() === '') {
  console.error('GOOGLE_GENAI_API_KEY is missing or empty');
  throw new Error('GOOGLE_GENAI_API_KEY environment variable is required. Please add it to your Vercel environment variables.');
}

export const ai = genkit({
  plugins: [googleAI({apiKey})],
  model: 'googleai/gemini-2.0-flash-exp',
});
