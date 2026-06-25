import type { InputHTMLAttributes, ChangeEvent, FocusEvent } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onFocus' | 'onBlur'> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  size?: InputSize;
  fullWidth?: boolean;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export function Input({ 
  label, 
  error, 
  helperText, 
  className = '',
  size = 'md',
  fullWidth = true,
  onChange,
  onFocus,
  onBlur,
  ...props 
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
  };

  const sizeStyles: Record<InputSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-accent-500 focus:ring-accent-500' : 'border-gray-300 focus:ring-primary-500';

  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`${sizeStyles[size]} border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${errorClass} ${className}`}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-accent-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
