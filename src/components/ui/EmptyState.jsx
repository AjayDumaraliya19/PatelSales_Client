import React from 'react';
import Icon from './AppIcon';

export default function EmptyState({
  icon = 'InboxIcon',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="app-card p-8 sm:p-12 text-center animate-fade-in">
      <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon name={icon} size={28} className="text-[var(--secondary)]" />
      </div>
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-5 leading-relaxed">{description}</p>
      {action}
    </div>
  );
}
