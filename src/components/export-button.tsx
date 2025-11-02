'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { GeneratedPitchData } from './pitch-display';
import { trackExport } from '@/lib/analytics';

interface ExportButtonProps {
  data: GeneratedPitchData;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  const exportToMarkdown = () => {
    trackExport('markdown');
    
    const { name, elevatorPitch, keyFeatures, targetAudience, monetizationStrategy, mvpRoadmap, pitchDeckOutline, rating, justification } = data;

    const markdownContent = `
# ${name}

## Elevator Pitch
${elevatorPitch}

## Brutal Rating: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
**Justification:** ${justification}

## Key Features
${keyFeatures.map(m => `* ${m}`).join('\n')}

## Target Audience
${targetAudience.map(a => `* ${a}`).join('\n')}

## Monetization Strategy
${monetizationStrategy}

## MVP Roadmap
${mvpRoadmap.map(c => `* [ ] ${c}`).join('\n')}

## Pitch Deck Outline
${pitchDeckOutline.map(s => `### ${s.slide}\n${s.content}`).join('\n\n')}
`;

    const blob = new Blob([markdownContent.trim()], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '_')}_pitch.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={exportToMarkdown} size="lg" className="bg-green-600 hover:bg-green-700 text-white h-12 px-8 rounded-xl font-semibold" aria-label="Export pitch to Markdown file">
      <Download className="mr-2 h-5 w-5" aria-hidden="true" />
      Export to Markdown
    </Button>
  );
};

export default ExportButton;
