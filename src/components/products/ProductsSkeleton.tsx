import React from 'react';

interface ProductsSkeletonProps {
  viewMode: 'grid' | 'list';
}

export default function ProductsSkeleton({ viewMode }: ProductsSkeletonProps) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm p-4 flex gap-4">
            <div className="w-28 h-28 bg-gray-200 rounded-sm skeleton-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded-sm w-3/4 skeleton-pulse" />
              <div className="h-3 bg-gray-200 rounded-sm w-1/2 skeleton-pulse" />
              <div className="h-4 bg-gray-200 rounded-sm w-1/4 skeleton-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div className="aspect-square bg-gray-200 skeleton-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded-sm w-3/4 skeleton-pulse" />
            <div className="h-3 bg-gray-200 rounded-sm w-1/2 skeleton-pulse" />
            <div className="h-4 bg-gray-200 rounded-sm w-1/4 skeleton-pulse" />
            <div className="h-8 bg-gray-200 rounded-sm skeleton-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
