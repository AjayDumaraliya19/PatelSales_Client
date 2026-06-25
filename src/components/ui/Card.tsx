import type { ReactNode, HTMLAttributes } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  title, 
  subtitle,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  ...props 
}: CardProps) {
  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-white shadow-sm border border-gray-200',
    elevated: 'bg-white shadow-md border border-gray-200',
    outlined: 'bg-white border-2 border-gray-300',
    flat: 'bg-gray-50 border border-gray-200',
  };

  const paddingStyles: Record<NonNullable<typeof padding>, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : '';

  return (
    <div 
      className={`rounded-lg ${variantStyles[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className={`border-b border-gray-200 ${padding !== 'none' ? 'px-6 py-4' : 'px-6 py-4'}`}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
}
