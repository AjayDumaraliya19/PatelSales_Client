export function formatPrice(price: number, unit = 'Each'): string {
  return `$${price.toFixed(2)}/${unit}`;
}

export function formatPriceSimple(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getOrderStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'packed':
      return 'bg-indigo-100 text-indigo-800';
    case 'confirmed':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getOrderStatusBadgeVariant(status: string): 'success' | 'info' | 'warning' | 'danger' {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'success';
    case 'shipped':
    case 'packed':
      return 'info';
    case 'confirmed':
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'danger';
    default:
      return 'info';
  }
}
