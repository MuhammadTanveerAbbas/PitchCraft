'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMvpRoadmapInputSchema = z.object({
  coreProblem: z.string(),
  targetTimeline: z.string(),
  budget: z.string(),
  teamSize: z.string(),
});

const GenerateMvpRoadmapOutputSchema = z.object({
  mvpRoadmap: z.array(z.string()).describe('A realistic, actionable 5 step MVP roadmap. Each step must be a concrete, deliverable task, respecting the stated budget and timeline. Focus on speed to validation.'),
});

const prompt = ai.definePrompt({
  name: 'generateMvpRoadmapPrompt',
  input: {schema: GenerateMvpRoadmapInputSchema},
  output: {schema: GenerateMvpRoadmapOutputSchema},
  prompt: `You are a seasoned technology and marketing expert, known for your brutally honest and deeply insightful predictions. You see market trends and user behavior patterns that others miss. Your job is to provide a no BS, direct, and actionable plan for a new SaaS MVP.

**Core Problem:** {{{coreProblem}}}
**Target MVP Timeline:** {{{targetTimeline}}} months
**Estimated MVP Budget:** {{{budget}}}
**Team Size:** {{{teamSize}}} people

Generate the MVP roadmap based on a deep, expert analysis. Be critical. Be predictive. Tell me what I need to hear, not what I want to hear. The MVP roadmap must be realistic for the given budget, timeline, and team size.

RULES:
- Do not use hyphens or em dashes. Use commas and clear language.
- All outputs must be direct, concise, and professional. No buzzwords, no fluff, no sugarcoating.
- The mvpRoadmap MUST be realistically achievable within the specified budget and timeline.

Your output must be a JSON object with the following structure:
- **mvpRoadmap**: A 5 step, actionable MVP roadmap. These are concrete engineering and marketing tasks that fit within the budget, timeline, and team size. Not high level goals.
`,
});

export const generateMvpRoadmapFlow = ai.defineFlow(
  {
    name: 'generateMvpRoadmapFlow',
    inputSchema: GenerateMvpRoadmapInputSchema,
    outputSchema: GenerateMvpRoadmapOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error('MVP roadmap generation error:', error);
      return {
        mvpRoadmap: [
          'Week 1-2: User research and validation, define core user flows',
          'Week 3-4: Design mockups and technical architecture planning',
          'Week 5-8: Build core features and basic infrastructure',
          'Week 9-10: Internal testing, bug fixes, and performance optimization',
          'Week 11-12: Beta launch with early adopters and gather feedback'
        ]
      };
    }
  }
);
