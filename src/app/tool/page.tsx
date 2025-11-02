'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PitchGenerator = dynamic(() => import('@/components/pitch-generator'), {
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>
});

export default function DemoPage() {
  return <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>}><PitchGenerator /></Suspense>;
}