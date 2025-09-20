'use server';

/**
 * @fileOverview A flow for generating a brutally honest rating for a startup idea.
 *
 * - generateIdeaRating - A function that rates a startup idea.
 * - GenerateIdeaRatingInput - The input type for the generateIdeaRating function.
 * - GenerateIdeaRatingOutput - The return type for the generateIdeaRating function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIdeaRatingInputSchema = z.object({
  coreProblem: z.string().describe('The core problem the startup solves.'),
  industry: z.string().optional().describe('The industry of the startup.'),
  teamSize: z.string().describe('The size of the founding team.'),
  budget: z.string().describe('The estimated MVP budget.'),
});
export type GenerateIdeaRatingInput = z.infer<typeof GenerateIdeaRatingInputSchema>;

const GenerateIdeaRatingOutputSchema = z.object({
  rating: z.number().min(1).max(5).describe('A brutally honest rating of the idea from 1 to 5 stars.'),
  justification: z.string().describe('A concise, direct, and brutally honest justification for the rating. No sugarcoating. Focus on market viability, competition, and execution risk.'),
});
export type GenerateIdeaRatingOutput = z.infer<typeof GenerateIdeaRatingOutputSchema>;

export async function generateIdeaRating(input: GenerateIdeaRatingInput): Promise<GenerateIdeaRatingOutput> {
  return generateIdeaRatingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIdeaRatingPrompt',
  input: {schema: GenerateIdeaRatingInputSchema},
  output: {schema: GenerateIdeaRatingOutputSchema},
  prompt: `You are a cynical, seen it all venture capitalist who has reviewed thousands of pitches. Your feedback is brutally honest, direct, and cuts through all the hype. You are an expert in tech, marketing, and future market prediction.

You will rate the following startup idea on a scale of 1 to 5.

**Core Problem:** {{{coreProblem}}}
**Industry:** {{{industry}}}
**Team Size:** {{{teamSize}}}
**Budget:** {{{budget}}}

Analyze the idea based on the following criteria:
1.  **Market Size & Viability**: Is this a real problem for a large, paying market, or a niche vitamin?
2.  **Competition & Defensibility**: Is the market already saturated? What are the barriers to entry? Is it a feature or a company?
3.  **Execution Risk**: How difficult is this to build and scale with the given team size and budget? Is it a capital intensive black hole?
4.  **Monetization Potential**: Is there a clear path to revenue or is it a "we'll figure it out later" fantasy?

Provide a rating from 1 to 5, where:
- 1 Star: Dead on arrival. A solution in search of a problem.
- 2 Stars: Highly skeptical. Significant, likely fatal, flaws in the concept or market.
- 3 Stars: Mediocre. A crowded space or a vitamin, not a painkiller. Plausible, but unexciting.
- 4 Stars: Intriguing. Has potential with strong execution. A real problem with a plausible solution.
- 5 Stars: Exceptional. A massive, underserved market with a killer insight. A potential unicorn.

Your justification must be direct and ruthless. No fluff. No encouraging words. Just the cold, hard truth.

RULES:
- Do not use hyphens or em dashes.
- Your entire justification must be a single, concise paragraph.
`,
});

const generateIdeaRatingFlow = ai.defineFlow(
  {
    name: 'generateIdeaRatingFlow',
    inputSchema: GenerateIdeaRatingInputSchema,
    outputSchema: GenerateIdeaRatingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
