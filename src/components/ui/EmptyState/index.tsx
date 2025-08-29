import clsx from "clsx";
import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  showBorder?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No vehicles found",
  description = "We couldn't find any vehicles matching your current filters. Try adjusting your search criteria.",
  actionText,
  onAction,
  showBorder = false,
}) => {
  return (
    <div
      className={clsx(
        "mb-6 flex h-fit w-full flex-col items-center justify-center rounded-2xl border-dashed border-gray-500 bg-white px-6 py-20 lg:mb-0",
        showBorder ? "border" : "border-0"
      )}
    >
      <h3 className="text-gray-900">{title}</h3>

      <div className="h-4 flex-shrink-0" />

      <p className="text-base text-center text-gray-900">{description}</p>

      {actionText && onAction && (
        <>
          <div className="h-6 flex-shrink-0" />
          <button
            onClick={onAction}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            {actionText}
          </button>
        </>
      )}
    </div>
  );
};
