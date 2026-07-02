import React from 'react';

interface StatusBadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'neutral' | 'danger';
}

const variantClasses = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  neutral: 'bg-gray-100 text-gray-700 border-gray-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
};

export default function StatusBadge({ label, variant = 'neutral' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}

export function getOrderStatusVariant(
  status: string
): 'success' | 'warning' | 'info' | 'neutral' | 'danger' {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Shipped':
    case 'Packed':
      return 'info';
    case 'Confirmed':
    case 'Pending':
      return 'warning';
    case 'Cancelled':
      return 'danger';
    default:
      return 'neutral';
  }
}
