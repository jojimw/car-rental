import React from "react";

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonCard: React.FC = () => (
  <div
    data-testid="skeleton-item"
    className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"
  >
    <div className="aspect-[4/3] bg-gray-200 rounded-t-lg" />
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="text-right">
          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 6,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
