import * as Accordion from "@radix-ui/react-accordion";
import React from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { VEHICLE_MAKES, VEHICLE_COLORS } from "@/types/vehicle";

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
      fill="#0B0C0E"
    />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const FilterAccordionContent: React.FC = () => {
  const { selectedMakes, selectedColors, toggleMake, toggleColor } =
    useVehicleStore();

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={["make", "color"]}
      className="overflow-y-auto bg-white"
    >
      {/* Make Filter */}
      <Accordion.Item value="make" className="border-b border-gray-300">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="group flex flex-1 items-center justify-between gap-4 transition-all [&[data-state=open]>svg]:rotate-180 w-full p-6 hover:no-underline cursor-pointer">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Make</p>
            </div>
            <ChevronDownIcon className="group shrink-0 transition-transform duration-150 h-4 w-4" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="pt-0 text-base px-6 pb-6">
            <div className="flex flex-col gap-4">
              {VEHICLE_MAKES.map(make => (
                <label
                  key={make}
                  className="group text-base flex cursor-pointer items-center gap-2"
                  htmlFor={`make-${make}`}
                >
                  <input
                    type="checkbox"
                    id={`make-${make}`}
                    checked={selectedMakes.includes(make)}
                    onChange={() => toggleMake(make)}
                    className="hidden"
                  />
                  <span
                    className={`peer shrink-0 rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-2 border-gray-300 shadow-sm h-6 w-6 ${
                      selectedMakes.includes(make)
                        ? "border-primary bg-primary text-white"
                        : ""
                    }`}
                  >
                    {selectedMakes.includes(make) && (
                      <CheckIcon className="h-5 w-5" />
                    )}
                  </span>
                  <p className="text-base">{make}</p>
                </label>
              ))}
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>

      {/* Color Filter */}
      <Accordion.Item value="color" className="border-b-0">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="group flex flex-1 items-center justify-between gap-4 transition-all [&[data-state=open]>svg]:rotate-180 w-full p-6 hover:no-underline cursor-pointer">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Color</p>
            </div>
            <ChevronDownIcon className="group shrink-0 transition-transform duration-150 h-4 w-4" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="pt-0 text-base px-6 pb-6">
            <div className="flex flex-col gap-4">
              {VEHICLE_COLORS.map(color => (
                <label
                  key={color}
                  className="group text-base flex cursor-pointer items-center gap-2"
                  htmlFor={`color-${color}`}
                >
                  <input
                    type="checkbox"
                    id={`color-${color}`}
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                    className="hidden"
                  />
                  <span
                    className={`peer shrink-0 rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-2 border-gray-300 shadow-sm h-6 w-6 ${
                      selectedColors.includes(color)
                        ? "border-primary bg-primary text-white"
                        : ""
                    }`}
                  >
                    {selectedColors.includes(color) && (
                      <CheckIcon className="h-5 w-5" />
                    )}
                  </span>
                  <p className="text-base">{color}</p>
                </label>
              ))}
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
