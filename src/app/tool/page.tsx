'use client';

import { useState, useEffect } from 'react';
import PitchGenerator from '@/components/pitch-generator';
import DemoAuth from '@/components/demo-auth';
import Cookies from 'js-cookie';

export default function DemoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const rememberedUser = Cookies.get('rememberedUser');
    if (rememberedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <DemoAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <PitchGenerator />;
}