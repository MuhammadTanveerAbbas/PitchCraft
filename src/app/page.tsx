import ProjectLanding from '@/components/project-landing';
import { projects } from '@/lib/projects';

export default function LandingPage() {
  const pitchCraftProject = projects.find(p => p.id === 'pitchcraft')!;
  
  return <ProjectLanding project={pitchCraftProject} />;
}