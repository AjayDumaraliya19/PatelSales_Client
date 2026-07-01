import React from 'react';
import Icon from '../ui/AppIcon';
import { usePWA } from '../../hooks/usePWA';

export default function OfflineBanner() {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div
      className="fixed left-0 right-0 z-[60] bg-amber-500 text-amber-950 px-4 py-2 flex items-center justify-center gap-2 text-sm font-semibold shadow-md top-safe-offset"
      role="status"
      aria-live="polite"
    >
      <Icon name="SignalSlashIcon" size={16} />
      <span>You&apos;re offline — browsing cached content</span>
    </div>
  );
}
