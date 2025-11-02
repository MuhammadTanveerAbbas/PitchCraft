'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-card/50 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white font-display text-2xl">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
              {this.state.error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-red-400 text-sm font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
