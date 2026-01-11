'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePitchDeckOutlineInputSchema = z.object({
  coreProblem: z.string(),
});

const GeneratePitchDeckOutlineOutputSchema = z.object({
  pitchDeckOutline: z.array(z.object({
    slide: z.string().describe("The title of the pitch deck slide. Make it punchy and direct."),
    content: z.string().describe("Brutally honest, direct content for the slide. No fluff. Use data points or strong claims where possible."),
  })).describe('An 8 slide outline for an investor pitch deck, stripped of all fluff and corporate jargon.')
});

const prompt = ai.definePrompt({
  name: 'generatePitchDeckOutlinePrompt',
  input: {schema: GeneratePitchDeckOutlineInputSchema},
  output: {schema: GeneratePitchDeckOutlineOutputSchema},
  prompt: `You are a seasoned technology and marketing expert, known for your brutally honest and deeply insightful predictions. You see market trends and user behavior patterns that others miss. Your job is to provide a no BS, direct, and actionable plan for a new SaaS MVP.

**Core Problem:** {{{coreProblem}}}

Generate the pitch deck outline based on a deep, expert analysis. Be critical. Be predictive. Tell me what I need to hear, not what I want to hear.

RULES:
- Do not use hyphens or em dashes. Use commas and clear language.
- All outputs must be direct, concise, and professional. No buzzwords, no fluff, no sugarcoating.
- Think about second and third order consequences. Predict market reaction and potential pitfalls.

Your output must be a JSON object with the following structure:
- **pitchDeckOutline**: An 8 slide pitch deck outline. Each slide's content should be a punchy, data backed statement. No filler. This is for a pre-seed/seed stage investor.
`,
});

export const generatePitchDeckOutlineFlow = ai.defineFlow(
  {
    name: 'generatePitchDeckOutlineFlow',
    inputSchema: GeneratePitchDeckOutlineInputSchema,
    outputSchema: GeneratePitchDeckOutlineOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error('Pitch deck outline generation error:', error);
      return {
        pitchDeckOutline: [
          { slide: 'Problem', content: 'Clear articulation of the pain point and market gap' },
          { slide: 'Solution', content: 'Your unique approach to solving the problem' },
          { slide: 'Market Opportunity', content: 'TAM, SAM, SOM with realistic projections' },
          { slide: 'Product', content: 'Core features and user experience highlights' },
          { slide: 'Business Model', content: 'Revenue streams and unit economics' },
          { slide: 'Traction', content: 'Early metrics, partnerships, or validation' },
          { slide: 'Competition', content: 'Competitive landscape and your differentiation' },
          { slide: 'Team & Ask', content: 'Founding team credentials and funding requirements' }
        ]
      };
    }
  }
);
