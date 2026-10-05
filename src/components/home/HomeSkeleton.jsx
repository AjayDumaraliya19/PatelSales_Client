import React from 'react';

export default function HomeSkeleton() {
  return (
    <div className="min-h-full bg-white space-y-8 pb-12 animate-fadeIn">
      {/* Hero Banner Skeleton */}
      <div className="w-full h-[320px] sm:h-[420px] md:h-[480px] bg-gray-200 skeleton-pulse relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center space-y-4">
          <div className="h-6 w-32 bg-gray-300 rounded skeleton-pulse" />
          <div className="h-10 sm:h-14 w-3/4 sm:w-1/2 bg-gray-300 rounded skeleton-pulse" />
          <div className="h-4 sm:h-6 w-2/3 sm:w-1/3 bg-gray-300 rounded skeleton-pulse" />
          <div className="h-10 sm:h-12 w-40 bg-gray-300 rounded-lg skeleton-pulse mt-4" />
        </div>
      </div>

      {/* Promo Grid / Badges Skeleton */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 skeleton-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded skeleton-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded skeleton-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Row Skeleton */}
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-4 w-28 bg-gray-200 rounded skeleton-pulse" />
            <div className="h-7 w-56 bg-gray-200 rounded skeleton-pulse" />
          </div>
          <div className="h-5 w-20 bg-gray-200 rounded skeleton-pulse" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 space-y-3">
              <div className="aspect-square bg-gray-200 rounded-lg skeleton-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 skeleton-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 skeleton-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/3 skeleton-pulse" />
              <div className="h-8 bg-gray-200 rounded-lg skeleton-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Categories / Best Selling Skeleton */}
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="h-7 w-48 bg-gray-200 rounded skeleton-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl p-3 flex flex-col items-center justify-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 skeleton-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded skeleton-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
