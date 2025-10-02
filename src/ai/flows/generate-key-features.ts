'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKeyFeaturesInputSchema = z.object({
  coreProblem: z.string(),
  targetTimeline: z.string(),
  budget: z.string(),
  teamSize: z.string(),
});

const GenerateKeyFeaturesOutputSchema = z.object({
  keyFeatures: z.array(z.string()).describe('Three brutal, no nonsense features for the MVP. Focus on what delivers immediate value and nothing else. These should solve the core problem directly and be achievable within the given budget and timeline.'),
});

const prompt = ai.definePrompt({
  name: 'generateKeyFeaturesPrompt',
  input: {schema: GenerateKeyFeaturesInputSchema},
  output: {schema: GenerateKeyFeaturesOutputSchema},
  prompt: `You are a seasoned technology and marketing expert, known for your brutally honest and deeply insightful predictions. You see market trends and user behavior patterns that others miss. Your job is to provide a no BS, direct, and actionable plan for a new SaaS MVP.

**Core Problem:** {{{coreProblem}}}
**Target MVP Timeline:** {{{targetTimeline}}} months
**Estimated MVP Budget:** {{{budget}}}
**Team Size:** {{{teamSize}}} people

Generate the key features based on a deep, expert analysis. Be critical. Be predictive. Tell me what I need to hear, not what I want to hear. The MVP features must be realistic for the given budget, timeline, and team size.

RULES:
- Do not use hyphens or em dashes. Use commas and clear language.
- All outputs must be direct, concise, and professional. No buzzwords, no fluff, no sugarcoating.
- The key features MUST be realistically achievable within the specified budget and timeline.

Your output must be a JSON object with the following structure:
- **keyFeatures**: Three hyper focused MVP features. What is the absolute minimum to prove the concept and create a painkiller solution, not a vitamin. Justify each feature's inclusion based on the budget.
`,
});

export const generateKeyFeaturesFlow = ai.defineFlow(
  {
    name: 'generateKeyFeaturesFlow',
    inputSchema: GenerateKeyFeaturesInputSchema,
    outputSchema: GenerateKeyFeaturesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
