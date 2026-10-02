import React from 'react';
import Icon from '../ui/AppIcon';

export default function TrackingTimeline({ steps }) {
  const completedCount = steps.filter((s) => s.state === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="app-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Delivery Progress</h2>
        <span className="text-sm font-semibold text-[var(--secondary)]">{progressPercent}%</span>
      </div>

      <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[var(--secondary)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <ol className="space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const dotClass =
            step.state === 'completed'
              ? 'bg-[var(--secondary)] border-[var(--secondary)] text-white'
              : step.state === 'current'
                ? 'bg-white border-[var(--secondary)] text-[var(--secondary)] ring-4 ring-[var(--secondary)]/15'
                : 'bg-white border-gray-300 text-gray-300';

          return (
            <li key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute left-[15px] top-8 w-0.5 h-[calc(100%-16px)] ${
                    step.state === 'completed' ? 'bg-[var(--secondary)]' : 'bg-gray-200'
                  }`}
                />
              )}
              <div
                className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${dotClass}`}
              >
                {step.state === 'completed' ? (
                  <Icon name="CheckIcon" size={14} />
                ) : step.state === 'current' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--secondary)] animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p
                  className={`text-sm font-bold ${
                    step.state === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    step.state === 'upcoming' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {step.description}
                </p>
                {step.timestamp && (
                  <p className="text-[11px] text-gray-400 mt-1">
                    {new Date(step.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
