'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { industries } from '@/components/pitch-form';

export function QuickGenerationSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    coreProblem: '',
    industry: '',
  });

  const handleQuickGenerate = () => {
    if (formData.name && formData.coreProblem) {
      localStorage.setItem('quickGenData', JSON.stringify(formData));
      router.push('/tool');
    }
  };

  const allIndustries = Object.values(industries).flatMap((c) => c.items);

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-cyan-400" />
          Quick Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Startup Name</label>
          <Input
            placeholder="e.g., TechFlow"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Core Problem</label>
          <Textarea
            placeholder="Describe the problem your startup solves..."
            value={formData.coreProblem}
            onChange={(e) => setFormData({ ...formData, coreProblem: e.target.value })}
            className="bg-white/5 border-white/10 text-white min-h-[100px]"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Industry</label>
          <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/10">
              {allIndustries.map((industry) => (
                <SelectItem key={industry} value={industry} className="text-white">
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleQuickGenerate}
            disabled={!formData.name || !formData.coreProblem}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            <Zap className="h-4 w-4 mr-2" />
            Generate Pitch
          </Button>
          <Button
            onClick={() => router.push('/tool')}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Full Form
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
