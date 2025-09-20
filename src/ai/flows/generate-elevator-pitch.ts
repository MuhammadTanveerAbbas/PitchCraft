'use server';

/**
 * @fileOverview A flow for generating an elevator pitch from a core problem.
 *
 * - generateElevatorPitch - A function that generates an elevator pitch.
 * - GenerateElevatorPitchInput - The input type for the generateElevatorPitch function.
 * - GenerateElevatorPitchOutput - The return type for the generateElevatorPitch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateElevatorPitchInputSchema = z.object({
  coreProblem: z.string().describe('The core problem the startup solves.'),
});
export type GenerateElevatorPitchInput = z.infer<typeof GenerateElevatorPitchInputSchema>;

const GenerateElevatorPitchOutputSchema = z.object({
  elevatorPitch: z.string().describe('A concise and compelling elevator pitch for the startup.'),
});
export type GenerateElevatorPitchOutput = z.infer<typeof GenerateElevatorPitchOutputSchema>;

export async function generateElevatorPitch(input: GenerateElevatorPitchInput): Promise<GenerateElevatorPitchOutput> {
  return generateElevatorPitchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateElevatorPitchPrompt',
  input: {schema: GenerateElevatorPitchInputSchema},
  output: {schema: GenerateElevatorPitchOutputSchema},
  prompt: `You are a world class venture capitalist and startup accelerator mentor. Your analysis is brutally honest, direct, and insightful. You cut through the noise to deliver what matters.

Given the core problem, generate a single sentence elevator pitch.

The pitch must be sharp, memorable, and immediately understandable to an investor. It should clearly state the solution and the value proposition.

RULES:
- Do not use hyphens or em dashes. Use commas and clear language instead.
- Be direct and confident. No fluff. No sugarcoating.
- Focus on outcome and impact.

Core Problem: {{{coreProblem}}}`,
});

const generateElevatorPitchFlow = ai.defineFlow(
  {
    name: 'generateElevatorPitchFlow',
    inputSchema: GenerateElevatorPitchInputSchema,
    outputSchema: GenerateElevatorPitchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
