import React, { useEffect, useState } from "react";
import { AccordionFilterSidebar } from "@/components/filters/AccordionFilterSidebar";
import { FilterModal } from "@/components/filters/FilterModal";
import { MobileFilterBar } from "@/components/filters/MobileFilterBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { SortButton } from "@/components/ui/SortButton";
import { ZipCodeModal } from "@/components/ui/ZipCodeModal";
import { VehicleGrid } from "@/components/vehicle/VehicleGrid";
import { useVehicleStore } from "@/store/vehicleStore";
import { useZipCodeStore } from "@/store/zipCodeStore";
import FlexcarLogo from "../assets/icons/flexcar-logo.svg";
import LocationIcon from "../assets/icons/location-icon.svg";

export const InventoryPage: React.FC = () => {
  const { zipCode, isModalOpen, openModal, closeModal, hasValidZipCode } =
    useZipCodeStore();
  const { isLoading, loadVehicles, filteredVehicles } = useVehicleStore();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Open modal if no valid ZIP code is stored
  useEffect(() => {
    if (!hasValidZipCode()) openModal();
  }, [hasValidZipCode, openModal]);

  // Load vehicles when ZIP code changes
  useEffect(() => {
    if (zipCode) loadVehicles();
  }, [zipCode, loadVehicles]);

  const handleChangeLocation = () => {
    openModal();
  };

  if (!hasValidZipCode() && !isModalOpen)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Welcome to Flexcar"
          description="Enter your ZIP code to start browsing available vehicles in your area."
          actionText="Enter ZIP Code"
          onAction={handleChangeLocation}
        />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white">
        <div className="flex w-full flex-col justify-center px-[24px] max-w-[1440px] pr-[8px] mx-auto">
          <nav className="flex w-full items-center justify-between py-[16px] sm:py-[24px]">
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="h-[40px] w-[107px]">
                <FlexcarLogo />
              </div>
              <button
                onClick={handleChangeLocation}
                className="p-0 m-0 cursor-pointer group inline-flex h-auto w-fit max-w-full flex-shrink items-center justify-center gap-2 whitespace-nowrap border border-gray-200 py-2 text-sm font-medium transition-all hover:border-gray-300 hover:bg-gray-200 shadow-none border-none px-3 bg-transparent md:bg-gray-100 rounded-[8px] text-gray-900"
              >
                <div className="flex-shrink-0 h-[16px] w-[16px]">
                  <LocationIcon />
                </div>
                <p className="flex flex-shrink items-center gap-[6px] overflow-hidden text-ellipsis whitespace-nowrap transition-all text-gray-900 font-semibold">
                  {zipCode}
                </p>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Filter Bar */}
      <MobileFilterBar onOpenModal={() => setIsFilterModalOpen(true)} />

      {/* Main Content */}
      <div className="w-full flex-1 flex justify-center bg-white lg:bg-[linear-gradient(white_144px,_#F4F5F6_144px_100%)]">
        <div className="w-full max-w-[1440px] gap-8 px-6 py-6">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Count and Sort Controls */}
            <div className="flex w-full items-center justify-between mb-6">
              <p className="text-sm font-normal text-gray-700">
                {filteredVehicles.length} results
              </p>
              <SortButton />
            </div>

            {/* Vehicle Grid or Loading State */}
            <div className="flex flex-col gap-[40px] lg:flex-row items-start">
              {isLoading ? <SkeletonLoader count={6} /> : <VehicleGrid />}

              {/* Filter Sidebar */}
              <AccordionFilterSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* ZIP Code Modal */}
      <ZipCodeModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </div>
  );
};
