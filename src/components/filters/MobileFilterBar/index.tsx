import React from "react";
import { useVehicleStore } from "@/store/vehicleStore";

const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 15 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.22266 9.32324C4.02669 9.32324 3.86035 9.2526 3.72363 9.11133C3.58691 8.96549 3.51855 8.79688 3.51855 8.60547C3.51855 8.40495 3.58464 8.23405 3.7168 8.09277C3.85352 7.9515 4.02214 7.88086 4.22266 7.88086H11.4277C11.6283 7.88086 11.7969 7.9515 11.9336 8.09277C12.0749 8.23405 12.1455 8.40495 12.1455 8.60547C12.1455 8.80143 12.0749 8.97005 11.9336 9.11133C11.7969 9.2526 11.6283 9.32324 11.4277 9.32324H4.22266ZM2.84863 5.78223C2.65267 5.78223 2.48405 5.71159 2.34277 5.57031C2.20605 5.42904 2.1377 5.26042 2.1377 5.06445C2.1377 4.86849 2.20605 4.69987 2.34277 4.55859C2.48405 4.41276 2.65267 4.33984 2.84863 4.33984H12.8086C13.0046 4.33984 13.1709 4.41048 13.3076 4.55176C13.4443 4.69303 13.5127 4.86393 13.5127 5.06445C13.5127 5.26042 13.4443 5.42904 13.3076 5.57031C13.1709 5.71159 13.0046 5.78223 12.8086 5.78223H2.84863ZM1.44727 2.24805C1.25586 2.24805 1.08952 2.17741 0.948242 2.03613C0.811523 1.8903 0.743164 1.7194 0.743164 1.52344C0.743164 1.32747 0.811523 1.15885 0.948242 1.01758C1.08496 0.871745 1.2513 0.798828 1.44727 0.798828H14.1758C14.3809 0.798828 14.5495 0.869466 14.6816 1.01074C14.8184 1.15202 14.8867 1.32292 14.8867 1.52344C14.8867 1.72396 14.8184 1.89486 14.6816 2.03613C14.5449 2.17741 14.3763 2.24805 14.1758 2.24805H1.44727Z"
      fill="currentColor"
    />
  </svg>
);

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

interface MobileFilterBarProps {
  onOpenModal: () => void;
}

export const MobileFilterBar: React.FC<MobileFilterBarProps> = ({
  onOpenModal,
}) => {
  const { selectedMakes, selectedColors, toggleMake, toggleColor } =
    useVehicleStore();

  const allSelectedFilters = [...selectedMakes, ...selectedColors];
  const hasActiveFilters = allSelectedFilters.length > 0;

  const removeFilter = (filter: string) => {
    if (selectedMakes.includes(filter)) toggleMake(filter);
    else if (selectedColors.includes(filter)) toggleColor(filter);
  };

  return (
    <div className="sticky top-0 z-10 flex w-full items-center bg-white px-6 py-2 lg:hidden min-h-12">
      {/* Filter Button */}
      <button
        onClick={onOpenModal}
        className="p-0 m-0 text-base focus:ring-0 flex h-auto items-center gap-2"
      >
        <FilterIcon className="h-3 w-4 flex-shrink-0 text-primary" />
        <p className="text-sm font-semibold whitespace-nowrap text-primary">
          Filter{hasActiveFilters && ` (${allSelectedFilters.length})`}
        </p>
      </button>

      {/* Selected Filter Chips */}
      {hasActiveFilters && (
        <div className="relative min-w-0 flex-1 ml-4">
          <div className="overflow-x-auto gap-1 flex">
            {allSelectedFilters.map(filter => (
              <button
                key={filter}
                onClick={() => removeFilter(filter)}
                className="p-0 m-0 text-base focus:ring-0 flex h-auto min-w-fit flex-row items-center justify-center gap-1 whitespace-nowrap rounded-full border border-gray-300 bg-white py-2 hover:bg-gray-100 px-3"
                type="button"
              >
                <p className="text-sm">{filter}</p>
                <div className="opacity-100">
                  <CloseIcon className="h-4 w-4 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
