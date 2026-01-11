'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

type SubscriptionBadgeProps = {
  status: string;
  isActive: boolean;
  isPastDue: boolean;
  inGracePeriod: boolean;
};

export function SubscriptionBadge({ status, isActive, isPastDue, inGracePeriod }: SubscriptionBadgeProps) {
  if (isActive && !isPastDue) {
    return (
      <Badge className="bg-green-500">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    );
  }

  if (isPastDue && inGracePeriod) {
    return (
      <Badge className="bg-yellow-500">
        <Clock className="w-3 h-3 mr-1" />
        Grace Period
      </Badge>
    );
  }

  if (isPastDue) {
    return (
      <Badge className="bg-red-500">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Past Due
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      <XCircle className="w-3 h-3 mr-1" />
      {status === 'canceled' ? 'Cancelled' : 'Inactive'}
    </Badge>
  );
}
