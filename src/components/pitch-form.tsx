'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { sanitizeInput } from '@/lib/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Sparkles, Briefcase, Cpu, Lightbulb, Heart } from 'lucide-react';

const formSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name is too long.')
    .transform(sanitizeInput)
    .refine(val => /[a-zA-Z]{2,}/.test(val), 'Please provide a valid startup name.'),
  coreProblem: z
    .string()
    .min(10, 'Describe the core problem in at least 10 characters.')
    .max(500, 'Core problem description is too long.')
    .transform(sanitizeInput)
    .refine(val => /[a-zA-Z]{3,}/.test(val), 'Please provide a meaningful problem description.'),
  targetTimeline: z.enum(['1', '3', '6', '12']),
  budget: z.enum(['<10k', '10k-50k', '50k-250k', '>250k']),
  teamSize: z.enum(['1', '2-5', '6-10', '11+']),
  industry: z.string().optional(),
});

export type PitchFormValues = z.infer<typeof formSchema>;

interface PitchFormProps {
  onGenerate: (values: PitchFormValues) => void;
  onSurpriseMe: () => void;
  isLoading: boolean;
}

export const industries = {
  Technology: {
    icon: Cpu,
    items: [
      'Tech',
      'Developer',
      'AI',
      'Security',
      'Cloud',
      'SaaS',
    ],
  },
  'Business & Finance': {
    icon: Briefcase,
    items: [
      'FinTech',
      'Ecommerce',
      'RealEstate',
      'Logistics',
      'Marketing',
      'Legal',
    ],
  },
  'Creative & Media': {
    icon: Lightbulb,
    items: [
      'Entertainment',
      'Gaming',
      'Social',
      'Fashion',
      'Design',
      'Music',
    ],
  },
  'Lifestyle & Health': {
    icon: Heart,
    items: [
      'Healthcare',
      'Education',
      'Sustainability',
      'Travel',
      'Food',
      'Fitness',
    ],
  },
};

export function PitchForm({ onGenerate, onSurpriseMe, isLoading }: PitchFormProps) {
  const form = useForm<PitchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      coreProblem: '',
      targetTimeline: '3',
      budget: '10k-50k',
      teamSize: '1',
      industry: 'General Tech',
    },
  });

  function onSubmit(values: PitchFormValues) {
    // Additional client-side validation
    const sanitizedValues = {
      ...values,
      name: sanitizeInput(values.name),
      coreProblem: sanitizeInput(values.coreProblem),
    };
    onGenerate(sanitizedValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12" aria-label="Pitch generation form">
        {/* Basic Info Section */}
        <div className="space-y-8" role="region" aria-labelledby="basic-info-heading">
          <div className="text-center">
            <h2 id="basic-info-heading" className="font-display text-2xl md:text-3xl font-bold mb-2 text-white">Tell us about your startup</h2>
            <p className="text-gray-300 text-sm md:text-base">Just a few details to get started</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-white">Startup Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. InnovateInc" className="h-10 text-sm bg-accent/20 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/40" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">What's your working name?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-white">Team Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 text-sm bg-accent/20 border-white/20 text-white focus:ring-0 focus:ring-offset-0 focus:border-white/40">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black border-white/20">
                      <SelectItem value="1" className="text-sm text-white hover:bg-white/10">1 person (Solo founder)</SelectItem>
                      <SelectItem value="2-5" className="text-sm text-white hover:bg-white/10">2-5 people</SelectItem>
                      <SelectItem value="6-10" className="text-sm text-white hover:bg-white/10">6-10 people</SelectItem>
                      <SelectItem value="11+" className="text-sm text-white hover:bg-white/10">11+ people</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs text-gray-400">Current team size</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Core Problem Section */}
        <div className="space-y-8" role="region" aria-labelledby="problem-heading">
          <div className="text-center">
            <h2 id="problem-heading" className="font-display text-2xl md:text-3xl font-bold mb-2 text-white">What problem are you solving?</h2>
            <p className="text-gray-300 text-sm md:text-base">Describe your core idea in one clear sentence</p>
          </div>
          
          <FormField
            control={form.control}
            name="coreProblem"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">Core Problem Statement</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. Small businesses struggle to manage their inventory efficiently, leading to overstocking and lost sales."
                    className="min-h-[100px] text-sm bg-accent/20 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/40"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-400">Be specific about the problem you're solving and who has it</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Industry Selection */}
        <div className="space-y-8" role="region" aria-labelledby="industry-heading">
          <div className="text-center">
            <h2 id="industry-heading" className="font-display text-2xl md:text-3xl font-bold mb-2 text-white">Choose your industry</h2>
            <p className="text-gray-300 text-sm md:text-base">This helps us tailor insights specific to your market</p>
          </div>
          
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-8">
                  {Object.entries(industries).map(([category, { icon: Icon, items }]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
                        <div className="bg-white/10 p-2 rounded-full">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {items.map(industry => (
                          <Button
                            key={industry}
                            type="button"
                            variant={field.value === industry ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => field.onChange(industry)}
                            className={`h-9 text-xs font-medium transition-all hover:scale-105 ${
                              field.value === industry 
                                ? 'bg-white text-black hover:bg-gray-200' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            {industry}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <FormMessage className="pt-2" />
              </FormItem>
            )}
          />
        </div>
        {/* Timeline & Budget */}
        <div className="space-y-8" role="region" aria-labelledby="timeline-heading">
          <div className="text-center">
            <h2 id="timeline-heading" className="font-display text-2xl md:text-3xl font-bold mb-2 text-white">Timeline & Budget</h2>
            <p className="text-gray-300 text-sm md:text-base">Help us scope your MVP recommendations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="targetTimeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-white">Target MVP Timeline</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-10 text-sm bg-accent/20 border-white/20 text-white focus:ring-0 focus:ring-offset-0 focus:border-white/40">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        <SelectItem value="1" className="text-sm text-white hover:bg-white/10">1 month (Quick prototype)</SelectItem>
                        <SelectItem value="3" className="text-sm text-white hover:bg-white/10">3 months (Standard MVP)</SelectItem>
                        <SelectItem value="6" className="text-sm text-white hover:bg-white/10">6 months (Feature-rich MVP)</SelectItem>
                        <SelectItem value="12" className="text-sm text-white hover:bg-white/10">12 months (Complex product)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">Time to build your MVP</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-white">Estimated MVP Budget</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-10 text-sm bg-accent/20 border-white/20 text-white focus:ring-0 focus:ring-offset-0 focus:border-white/40">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        <SelectItem value="<10k" className="text-sm text-white hover:bg-white/10">Under $10,000 (Bootstrap)</SelectItem>
                        <SelectItem value="10k-50k" className="text-sm text-white hover:bg-white/10">$10,000 - $50,000 (Small team)</SelectItem>
                        <SelectItem value="50k-250k" className="text-sm text-white hover:bg-white/10">$50,000 - $250,000 (Professional)</SelectItem>
                        <SelectItem value=">250k" className="text-sm text-white hover:bg-white/10">Over $250,000 (Enterprise)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">Available development budget</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-8 pt-12 border-t border-white/10" role="region" aria-labelledby="submit-heading">
          <div className="text-center">
            <h2 id="submit-heading" className="font-display text-2xl md:text-3xl font-bold mb-2 text-white">Ready to generate your pitch?</h2>
            <p className="text-gray-300 text-sm md:text-base">This will take about 30-60 seconds</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
            <Button type="submit" disabled={isLoading} size="lg" className="flex-1 h-12 text-base font-semibold bg-white text-black hover:bg-gray-200 rounded-xl" aria-label="Generate pitch based on provided information">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" aria-hidden="true" />
                  Generate My Pitch
                </>
              )}
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              size="lg"
              variant="outline"
              className="flex-1 h-12 text-base font-semibold border-white/20 text-white hover:bg-white/10 rounded-xl"
              onClick={onSurpriseMe}
              aria-label="Generate a random startup idea and pitch"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Please wait...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
                  Surprise Me
                </>
              )}
            </Button>
          </div>
          
          <div className="text-center text-gray-300 text-sm">
            <p>✨ Get elevator pitch, market analysis, MVP roadmap & more</p>
          </div>
        </div>
      </form>
    </Form>
  );
}
