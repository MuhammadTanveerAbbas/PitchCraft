export interface Project {
  id: string;
  name: string;
  headline: string;
  subheadline: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  demoUrl: string;
  screenshots: {
    url: string;
    alt: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 'pitchcraft',
    name: 'PitchCraft',
    headline: 'Turn startup ideas into compelling pitches in seconds',
    subheadline: 'Built in 2 weeks',
    problem: 'Founders struggle to articulate their startup vision clearly and professionally. Creating a compelling pitch deck takes weeks of work, multiple iterations, and often expensive consultants. Most entrepreneurs waste valuable time on formatting instead of focusing on building their product.',
    solution: 'PitchCraft uses AI to instantly transform any startup idea into a structured, professional pitch. Input your core problem and get a complete pitch with elevator pitch, target audience analysis, monetization strategy, MVP roadmap, and exportable markdown format.',
    result: 'Founder onboarded 25 beta users and secured investor interest within the first month. Users report saving 15+ hours on pitch preparation and achieving 40% higher engagement rates in investor meetings.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Google AI', 'Genkit', 'Vercel', 'React Hook Form', 'Zod'],
    demoUrl: '/tool',
    screenshots: [
      {
        url: '/screenshots/form.png',
        alt: 'PitchCraft form interface',
        description: 'Simple form interface for inputting startup ideas'
      },
      {
        url: '/screenshots/results.png', 
        alt: 'Generated pitch results',
        description: 'AI-generated pitch with structured sections and export options'
      }
    ]
  }
];

export function getProject(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}