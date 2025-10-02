'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
  name: z.string().min(2, 'Name must be at least 2 characters.').max(50, 'Name is too long.'),
  coreProblem: z
    .string()
    .min(10, 'Describe the core problem in at least 10 characters.')
    .max(150, 'Core problem description is too long.'),
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
    onGenerate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headline text-lg">Startup Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. InnovateInc" {...field} />
                </FormControl>
                <FormDescription>What is the working name of your startup?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headline text-lg">Team Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your team size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 person (Solo founder)</SelectItem>
                    <SelectItem value="2-5">2-5 people</SelectItem>
                    <SelectItem value="6-10">6-10 people</SelectItem>
                    <SelectItem value="11+">11+ people</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>How many people are on your team?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="coreProblem"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Core Problem (One Sentence)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. A platform to connect local artisans with a global market."
                  {...field}
                />
              </FormControl>
              <FormDescription>Concisely describe the main problem you are solving.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="font-headline text-lg">Industry</FormLabel>
                <FormDescription>Tailor the pitch to a specific sector for better results.</FormDescription>
              </div>
              <div className="space-y-6">
                {Object.entries(industries).map(([category, { icon: Icon, items }]) => (
                  <div key={category}>
                    <h3 className="mb-3 flex items-center gap-2 text-md font-semibold text-muted-foreground">
                      <Icon className="h-5 w-5" />
                      {category}
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                      {items.map(industry => (
                        <Button
                          key={industry}
                          type="button"
                          variant={field.value === industry ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => field.onChange(industry)}
                          className="font-normal text-xs lg:px-2 lg:py-1 lg:text-xs lg:h-8"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="targetTimeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headline text-lg">Target MVP Timeline</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 month</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Estimated time to build the Minimum Viable Product.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headline text-lg">Estimated MVP Budget (USD)</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<10k">Under $10,000</SelectItem>
                      <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                      <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                      <SelectItem value=">250k">Over $250,000</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>This will help tailor the scope of the MVP.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto flex-grow">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Craft Pitch
              </>
            )}
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onSurpriseMe}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Surprise Me
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
