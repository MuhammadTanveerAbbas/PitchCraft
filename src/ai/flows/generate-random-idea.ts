'use server';

/**
 * @fileOverview A flow for generating a random startup idea.
 *
 * - generateRandomIdea - A function that generates a random startup name and core problem.
 * - GenerateRandomIdeaOutput - The return type for the generateRandomIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRandomIdeaOutputSchema = z.object({
  name: z.string().describe('A creative and catchy name for a startup concept. Avoid generic tech-sounding names.'),
  coreProblem: z.string().describe('A one sentence description of the core problem the startup solves. Focus on a real, painful problem.'),
});
export type GenerateRandomIdeaOutput = z.infer<typeof GenerateRandomIdeaOutputSchema>;

export async function generateRandomIdea(): Promise<GenerateRandomIdeaOutput> {
  return generateRandomIdeaFlow();
}

const prompt = ai.definePrompt({
  name: 'generateRandomIdeaPrompt',
  output: {schema: GenerateRandomIdeaOutputSchema},
  prompt: `You are a creative muse for entrepreneurs, with a knack for spotting unsaturated markets and unique problems.
  Generate a single, unique, and interesting startup idea consisting of a name and a one sentence core problem it solves.
  The idea should be fresh and not a cliché. Think of underserved niches or surprising applications of technology. Avoid generic names.

  RULES:
  - Do not use hyphens or em dashes.
  - The name should be memorable and hint at the solution.
  - The core problem must be specific and relatable to a clear audience.
  
  Good Examples:
  - Name: "ArchiveOS", Core Problem: "Families struggle to preserve and privately share their most important digital memories and documents across generations."
  - Name: "Localvore Connect", Core Problem: "It's difficult for consumers to discover and purchase fresh produce directly from local farms, creating a gap in the farm to table movement."
  - Name: "CodeMentor", Core Problem: "Junior developers lack personalized, on demand guidance when they get stuck on complex coding problems, slowing down their growth and project timelines."
  
  Bad Examples:
  - Name: "Cloudify", Core Problem: "Making things better with the cloud."
  - Name: "Socially", Core Problem: "A new social network for people."
  `,
});

const generateRandomIdeaFlow = ai.defineFlow(
  {
    name: 'generateRandomIdeaFlow',
    outputSchema: GenerateRandomIdeaOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
