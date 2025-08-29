import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import React from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { SortOption } from "@/types/vehicle";

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.29289 9.29302C6.68342 8.90249 7.31658 8.90249 7.70711 9.29302L12 13.5859L16.2929 9.29302C16.6834 8.90249 17.3166 8.90249 17.7071 9.29302C18.0976 9.68354 18.0976 10.3167 17.7071 10.7072L12.7071 15.7072C12.3166 16.0978 11.6834 16.0978 11.2929 15.7072L6.29289 10.7072C5.90237 10.3167 5.90237 9.68354 6.29289 9.29302Z"
    />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "price-low", label: "Price: Low to high" },
  { value: "price-high", label: "Price: High to low" },
  { value: "make-az", label: "Make A-Z" },
];

export const SortButton: React.FC = () => {
  const { sortOption, setSortOption } = useVehicleStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentSortLabel =
    sortOptions.find(option => option.value === sortOption)?.label ||
    "Price: Low to high";

  const onOptionSelect = (value: SortOption) => {
    setSortOption(value);
    setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="outline-none focus:outline-none cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1 text-sm">
            Sort by
            <p className="text-sm font-semibold leading-5 text-gray-900">
              {currentSortLabel}
            </p>
            <ChevronDownIcon className="w-6 h-6 fill-gray-900" />
          </div>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="relative z-50 max-h-96 min-w-32 overflow-hidden rounded-[16px] bg-white shadow-md border border-gray-200 outline-none animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
          side="bottom"
          align="end"
          sideOffset={8}
          role="listbox"
        >
          <div className="p-1">
            <div className="py-1.5 pl-4 pr-14 text-sm text-gray-500">
              Sort by
            </div>
            <div className="-mx-1 my-1 h-px bg-gray-100" />
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onOptionSelect(option.value)}
                className={clsx(
                  "relative flex w-full select-none items-center rounded-[16px] py-3 pl-4 pr-14 outline-none hover:bg-gray-50  cursor-pointer text-sm",
                  sortOption === option.value
                    ? "bg-gray-100 hover:bg-gray-100"
                    : "hover:bg-gray-100"
                )}
              >
                <span className="absolute right-3 flex h-3.5 w-3.5 items-center justify-center">
                  {sortOption === option.value && (
                    <CheckIcon className="h-4 w-4 text-gray-900" />
                  )}
                </span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
