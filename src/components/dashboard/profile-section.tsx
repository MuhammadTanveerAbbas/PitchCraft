'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CreditCard, Settings, Save } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { industries } from '@/components/pitch-form';
import Link from 'next/link';

interface UserPreferences {
  default_industry?: string;
  default_team_size?: string;
  default_budget?: string;
  default_timeline?: string;
}

export function ProfileSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/dashboard/preferences');
      const data = await response.json();
      setPreferences(data.preferences || {});
    } catch (error) {
      console.error('Failed to fetch preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      await fetch('/api/dashboard/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
      toast({ title: 'Preferences saved successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to save preferences' });
    } finally {
      setSaving(false);
    }
  };

  const allIndustries = Object.values(industries).flatMap((c) => c.items);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/10 animate-pulse">
            <CardContent className="p-6 h-48" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-cyan-400" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <Input
              value={user?.email || ''}
              disabled
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">User ID</label>
            <Input
              value={user?.id || ''}
              disabled
              className="bg-white/5 border-white/10 text-white font-mono text-xs"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-cyan-400" />
            Generation Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Default Industry</label>
            <Select
              value={preferences.default_industry}
              onValueChange={(value) => setPreferences({ ...preferences, default_industry: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select default industry" />
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

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Default Team Size</label>
            <Select
              value={preferences.default_team_size}
              onValueChange={(value) => setPreferences({ ...preferences, default_team_size: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select default team size" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {['Solo', '2-5', '6-10', '11-20', '20+'].map((size) => (
                  <SelectItem key={size} value={size} className="text-white">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Default Budget</label>
            <Select
              value={preferences.default_budget}
              onValueChange={(value) => setPreferences({ ...preferences, default_budget: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select default budget" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+'].map((budget) => (
                  <SelectItem key={budget} value={budget} className="text-white">
                    {budget}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Default Timeline (months)</label>
            <Select
              value={preferences.default_timeline}
              onValueChange={(value) => setPreferences({ ...preferences, default_timeline: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select default timeline" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {['3', '6', '9', '12', '18', '24'].map((timeline) => (
                  <SelectItem key={timeline} value={timeline} className="text-white">
                    {timeline} months
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={savePreferences}
            disabled={saving}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-cyan-400" />
            Billing & Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">Manage your subscription and billing information</p>
          <div className="flex gap-3">
            <Link href="/pricing" className="flex-1">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                View Plans
              </Button>
            </Link>
            <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              Billing Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
