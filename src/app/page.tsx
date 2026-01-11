import ModernLanding from '@/components/modern-landing';
import { projects } from '@/lib/projects';

export default function LandingPage() {
  const pitchCraftProject = projects.find(p => p.id === 'pitchcraft')!;
  
  return <ModernLanding project={pitchCraftProject} />;
}