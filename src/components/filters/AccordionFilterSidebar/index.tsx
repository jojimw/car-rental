import clsx from "clsx";
import React, { useState } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { FilterAccordionContent } from "../FilterAccordionContent";

const MAX_VISIBLE_CHIPS = 4;

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.28015 4.22C5.13798 4.08752 4.94993 4.0154 4.75563 4.01882C4.56133 4.02225 4.37594 4.10096 4.23853 4.23838C4.10112 4.37579 4.02241 4.56118 4.01898 4.75548C4.01555 4.94978 4.08767 5.13782 4.22015 5.28L6.94015 8L4.22015 10.72C4.14647 10.7887 4.08736 10.8715 4.04637 10.9635C4.00538 11.0555 3.98334 11.1548 3.98156 11.2555C3.97979 11.3562 3.99831 11.4562 4.03603 11.5496C4.07375 11.643 4.1299 11.7278 4.20112 11.799C4.27233 11.8703 4.35717 11.9264 4.45056 11.9641C4.54394 12.0018 4.64397 12.0204 4.74468 12.0186C4.84538 12.0168 4.94469 11.9948 5.03669 11.9538C5.12869 11.9128 5.21149 11.8537 5.28015 11.78L8.00015 9.06L10.7202 11.78C10.7888 11.8537 10.8716 11.9128 10.9636 11.9538C11.0556 11.9948 11.1549 12.0168 11.2556 12.0186C11.3563 12.0204 11.4564 12.0018 11.5498 11.9641C11.6431 11.9264 11.728 11.8703 11.7992 11.799C11.8704 11.7278 11.9266 11.643 11.9643 11.5496C12.002 11.4562 12.0205 11.3562 12.0187 11.2555C12.017 11.1548 11.9949 11.0555 11.9539 10.9635C11.9129 10.8715 11.8538 10.7887 11.7802 10.72L9.06015 8L11.7802 5.28C11.9126 5.13782 11.9848 4.94978 11.9813 4.75548C11.9779 4.56118 11.8992 4.37579 11.7618 4.23838C11.6244 4.10096 11.439 4.02225 11.2447 4.01882C11.0504 4.0154 10.8623 4.08752 10.7202 4.22L8.00015 6.94L5.28015 4.22Z"
      fill="#0B0C0E"
    />
  </svg>
);

export const AccordionFilterSidebar: React.FC = () => {
  const {
    selectedMakes,
    selectedColors,
    toggleMake,
    toggleColor,
    resetFilters,
  } = useVehicleStore();

  const [showMoreChips, setShowMoreChips] = useState(false);

  const handleResetFilters = () => {
    resetFilters();
  };

  const allSelectedFilters = [...selectedMakes, ...selectedColors];
  const hasActiveFilters = allSelectedFilters.length > 0;
  const visibleChips = showMoreChips
    ? allSelectedFilters
    : allSelectedFilters.slice(0, MAX_VISIBLE_CHIPS);
  const hasHiddenChips = allSelectedFilters.length > MAX_VISIBLE_CHIPS;

  const removeFilter = (filter: string) => {
    if (selectedMakes.includes(filter)) toggleMake(filter);
    else if (selectedColors.includes(filter)) toggleColor(filter);
  };

  return (
    <div className="overflow-hidden sticky top-8 hidden h-fit max-h-[calc(100vh-64px)] w-72 flex-shrink-0 flex-col rounded-2xl border border-gray-300 lg:flex">
      {/* Filter Header and Selected Chips */}
      <div className="flex flex-col gap-4 rounded-t-2xl bg-gray-100 p-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">
            Filters{hasActiveFilters && ` (${allSelectedFilters.length})`}
          </p>

          <button
            onClick={handleResetFilters}
            className={clsx(
              "p-0 m-0 text-base h-auto",
              hasActiveFilters ? "cursor-pointer" : "opacity-50"
            )}
            disabled={!hasActiveFilters}
            data-testid="clear-all-filters-button"
          >
            <p
              className={clsx(
                "text-xs font-semibold",
                hasActiveFilters ? "text-primary" : "text-gray-400"
              )}
            >
              Clear all
            </p>
          </button>
        </div>

        {/* Selected Filter Chips */}
        {hasActiveFilters && (
          <div>
            {/* Mobile: Horizontal scroll */}
            <div className="relative block md:hidden">
              <div className="overflow-x-auto snap-x snap-mandatory gap-1 flex">
                {visibleChips.map(filter => (
                  <div key={filter} className="opacity-100">
                    <button
                      onClick={() => removeFilter(filter)}
                      className="p-0 m-0 text-base snap-center focus:ring-0 flex h-auto min-w-fit flex-row items-center justify-center gap-1 whitespace-nowrap rounded-full border border-gray-300 bg-white py-1 pl-2 pr-1 hover:bg-gray-100 cursor-pointer"
                      type="button"
                    >
                      <p className="text-xs font-semibold truncate">{filter}</p>
                      <CloseIcon className="inline-block h-4 w-4" />
                    </button>
                  </div>
                ))}
                {hasHiddenChips && (
                  <button
                    onClick={() => setShowMoreChips(!showMoreChips)}
                    className="text-xs font-semibold text-primary ml-2"
                  >
                    {showMoreChips ? "See less" : "See more"}
                  </button>
                )}
              </div>
              <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-gray-100" />
            </div>

            {/* Desktop: Wrap layout */}
            <div className="hidden md:block">
              <div className="flex flex-row flex-wrap gap-2">
                {visibleChips.map(filter => (
                  <div key={filter} className="opacity-100">
                    <button
                      onClick={() => removeFilter(filter)}
                      className="p-0 m-0 text-base focus:ring-0 flex h-auto min-w-fit flex-row items-center justify-center gap-1 whitespace-nowrap rounded-full border border-gray-300 bg-white py-1 pl-2 pr-1 hover:bg-gray-100 cursor-pointer"
                      type="button"
                    >
                      <p
                        data-testid="filter-chip-value"
                        className="text-xs font-semibold truncate"
                      >
                        {filter}
                      </p>
                      <CloseIcon className="inline-block h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              {hasHiddenChips && (
                <button
                  onClick={() => setShowMoreChips(!showMoreChips)}
                  className="text-xs font-semibold text-primary mt-4 cursor-pointer"
                >
                  {showMoreChips
                    ? "Show less"
                    : `Show ${allSelectedFilters.length - MAX_VISIBLE_CHIPS} more`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Accordion Filters */}
      <FilterAccordionContent />
    </div>
  );
};
