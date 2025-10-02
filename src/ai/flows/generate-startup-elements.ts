'use server';

import { generateKeyFeaturesFlow } from './generate-key-features';
import { generateTargetAudienceFlow } from './generate-target-audience';
import { generateMonetizationStrategyFlow } from './generate-monetization-strategy';
import { generateMvpRoadmapFlow } from './generate-mvp-roadmap';
import { generatePitchDeckOutlineFlow } from './generate-pitch-deck-outline';
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
    const [keyFeatures, targetAudience, monetizationStrategy, mvpRoadmap, pitchDeckOutline] = await Promise.all([
        generateKeyFeaturesFlow(input),
        generateTargetAudienceFlow(input),
        generateMonetizationStrategyFlow(input),
        generateMvpRoadmapFlow(input),
        generatePitchDeckOutlineFlow(input),
    ]);

    return {
        ...keyFeatures,
        ...targetAudience,
        ...monetizationStrategy,
        ...mvpRoadmap,
        ...pitchDeckOutline,
    };
}
