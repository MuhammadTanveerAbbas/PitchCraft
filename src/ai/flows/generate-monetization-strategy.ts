'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMonetizationStrategyInputSchema = z.object({
  coreProblem: z.string(),
});

const GenerateMonetizationStrategyOutputSchema = z.object({
  monetizationStrategy: z.string().describe('A single, clear, and defensible monetization strategy. Explain why it works based on market dynamics and user value.'),
});

const prompt = ai.definePrompt({
  name: 'generateMonetizationStrategyPrompt',
  input: {schema: GenerateMonetizationStrategyInputSchema},
  output: {schema: GenerateMonetizationStrategyOutputSchema},
  prompt: `You are a seasoned technology and marketing expert, known for your brutally honest and deeply insightful predictions. You see market trends and user behavior patterns that others miss. Your job is to provide a no BS, direct, and actionable plan for a new SaaS MVP.

**Core Problem:** {{{coreProblem}}}

Generate the monetization strategy based on a deep, expert analysis. Be critical. Be predictive. Tell me what I need to hear, not what I want to hear.

RULES:
- Do not use hyphens or em dashes. Use commas and clear language.
- All outputs must be direct, concise, and professional. No buzzwords, no fluff, no sugarcoating.
- Think about second and third order consequences. Predict market reaction and potential pitfalls.

Your output must be a JSON object with the following structure:
- **monetizationStrategy**: A single, robust monetization model. How will this make money? Justify your choice with market data or behavioral economics principles. Explain why other models are wrong.
`,
});

export const generateMonetizationStrategyFlow = ai.defineFlow(
  {
    name: 'generateMonetizationStrategyFlow',
    inputSchema: GenerateMonetizationStrategyInputSchema,
    outputSchema: GenerateMonetizationStrategyOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error('Monetization strategy generation error:', error);
      return {
        monetizationStrategy: 'Freemium model with tiered subscription plans. Free tier for basic features to drive adoption, paid tiers unlock advanced capabilities and higher usage limits. Revenue scales with customer value delivered.'
      };
    }
  }
);
