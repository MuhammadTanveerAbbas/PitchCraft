import {genkit} from 'genkit';
import groq from 'genkitx-groq';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey || apiKey.trim() === '') {
  console.error('GROQ_API_KEY is missing or empty');
  throw new Error('GROQ_API_KEY environment variable is required. Please add it to your .env.local file.');
}

export const ai = genkit({
  plugins: [groq({apiKey})],
  model: 'groq/llama-3.3-70b-versatile',
});

export async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      console.error(`Attempt ${i + 1} failed:`, error.message);
      if (i < maxRetries - 1) {
        const delay = Math.min(1000 * Math.pow(2, i), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
