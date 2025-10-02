'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTargetAudienceInputSchema = z.object({
  coreProblem: z.string(),
});

const GenerateTargetAudienceOutputSchema = z.object({
  targetAudience: z.array(z.string()).describe('Three hyper specific, addressable target audience segments. Go beyond demographics to psychographics and user behavior. Identify who feels the pain most acutely.'),
});

const prompt = ai.definePrompt({
  name: 'generateTargetAudiencePrompt',
  input: {schema: GenerateTargetAudienceInputSchema},
  output: {schema: GenerateTargetAudienceOutputSchema},
  prompt: `You are a seasoned technology and marketing expert, known for your brutally honest and deeply insightful predictions. You see market trends and user behavior patterns that others miss. Your job is to provide a no BS, direct, and actionable plan for a new SaaS MVP.

**Core Problem:** {{{coreProblem}}}

Generate the target audience based on a deep, expert analysis. Be critical. Be predictive. Tell me what I need to hear, not what I want to hear.

RULES:
- Do not use hyphens or em dashes. Use commas and clear language.
- All outputs must be direct, concise, and professional. No buzzwords, no fluff, no sugarcoating.
- Think about second and third order consequences. Predict market reaction and potential pitfalls.

Your output must be a JSON object with the following structure:
- **targetAudience**: Three specific, addressable customer segments. Who will pay for this on day one? Why? What is their deep psychological need for this product?
`,
});

export const generateTargetAudienceFlow = ai.defineFlow(
  {
    name: 'generateTargetAudienceFlow',
    inputSchema: GenerateTargetAudienceInputSchema,
    outputSchema: GenerateTargetAudienceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
