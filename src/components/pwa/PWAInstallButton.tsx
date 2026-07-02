import React from 'react';
import PWAInstallGuide from './PWAInstallGuide';

interface PWAInstallButtonProps {
  className?: string;
  label?: string;
  variant?: 'primary' | 'white';
}

export default function PWAInstallButton({
  className = '',
  label = 'Install App',
  variant = 'primary',
}: PWAInstallButtonProps) {
  return (
    <div className={className}>
      <PWAInstallGuide variant="card" showTitle={false} />
    </div>
  );
}
