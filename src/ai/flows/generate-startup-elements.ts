'use server';

/**
 * @fileOverview A startup element generator AI agent.
 *
 * - generateStartupElements - A function that handles the startup element generation process.
 * - GenerateStartupElementsInput - The input type for the generateStartupElements function.
 * - GenerateStartupElementsOutput - The return type for the generateStartupElements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStartupElementsInputSchema = z.object({
  coreProblem: z
    .string()
    .describe('The core problem the startup solves, described in a single sentence.'),
  targetTimeline: z
    .enum(['1', '3', '6', '12'])
    .describe('The target timeline for the MVP in months.'),
  budget: z
    .enum(['<10k', '10k-50k', '50k-250k', '>250k'])
    .describe('The estimated budget for the MVP in USD.'),
  teamSize: z
    .enum(['1', '2-5', '6-10', '11+'])
    .describe('The number of people on the team.'),
  industry: z
    .string()
    .optional()
    .describe('The industry the startup operates in (e.g., Healthcare, FinTech).'),
});
export type GenerateStartupElementsInput = z.infer<typeof GenerateStartupElementsInputSchema>;

const GenerateStartupElementsOutputSchema = z.object({
  keyFeatures: z.array(z.string()).describe('Three brutal, no nonsense features for the MVP. Focus on what delivers immediate value and nothing else. These should solve the core problem directly and be achievable within the given budget and timeline.'),
  targetAudience: z.array(z.string()).describe('Three hyper specific, addressable target audience segments. Go beyond demographics to psychographics and user behavior. Identify who feels the pain most acutely.'),
  monetizationStrategy: z.string().describe('A single, clear, and defensible monetization strategy. Explain why it works based on market dynamics and user value.'),
  mvpRoadmap: z.array(z.string()).describe('A realistic, actionable 5 step MVP roadmap. Each step must be a concrete, deliverable task, respecting the stated budget and timeline. Focus on speed to validation.'),
  pitchDeckOutline: z.array(z.object({
    slide: z.string().describe("The title of the pitch deck slide. Make it punchy and direct."),
    content: z.string().describe("Brutally honest, direct content for the slide. No fluff. Use data points or strong claims where possible."),
  })).describe('An 8 slide outline for an investor pitch deck, stripped of all fluff and corporate jargon.')
});
export type GenerateStartupElementsOutput = z.infer<typeof GenerateStartupElementsOutputSchema>;

export async function generateStartupElements(input: GenerateStartupElementsInput): Promise<GenerateStartupElementsOutput> {
  return generateStartupElementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStartupElementsPrompt',
  input: {schema: GenerateStartupElementsInputSchema},
  output: {schema: GenerateStartupElementsOutputSchema},
  prompt: `You are a seasoned technology and marketing expert, known for your brutally honest and deeply insightful predictions. You see market trends and user behavior patterns that others miss. Your job is to provide a no BS, direct, and actionable plan for a new SaaS MVP.

**Core Problem:** {{{coreProblem}}}
**Target MVP Timeline:** {{{targetTimeline}}} months
**Estimated MVP Budget:** {{{budget}}}
**Team Size:** {{{teamSize}}} people
{{#if industry}}
**Industry:** {{{industry}}}
{{/if}}

Generate the startup elements based on a deep, expert analysis. Be critical. Be predictive. Tell me what I need to hear, not what I want to hear. The MVP features and roadmap must be realistic for the given budget, timeline, and team size.

RULES:
- Do not use hyphens or em dashes. Use commas and clear language.
- All outputs must be direct, concise, and professional. No buzzwords, no fluff, no sugarcoating.
- Think about second and third order consequences. Predict market reaction and potential pitfalls.
- The key features and MVP roadmap MUST be realistically achievable within the specified budget and timeline.

Your output must be a JSON object with the following structure:
- **keyFeatures**: Three hyper focused MVP features. What is the absolute minimum to prove the concept and create a painkiller solution, not a vitamin. Justify each feature's inclusion based on the budget.
- **targetAudience**: Three specific, addressable customer segments. Who will pay for this on day one? Why? What is their deep psychological need for this product?
- **monetizationStrategy**: A single, robust monetization model. How will this make money? Justify your choice with market data or behavioral economics principles. Explain why other models are wrong.
- **mvpRoadmap**: A 5 step, actionable MVP roadmap. These are concrete engineering and marketing tasks that fit within the budget, timeline, and team size. Not high level goals.
- **pitchDeckOutline**: An 8 slide pitch deck outline. Each slide's content should be a punchy, data backed statement. No filler. This is for a pre-seed/seed stage investor.
`,
});

const generateStartupElementsFlow = ai.defineFlow(
  {
    name: 'generateStartupElementsFlow',
    inputSchema: GenerateStartupElementsInputSchema,
    outputSchema: GenerateStartupElementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
