import React from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { EmptyState } from "../../ui/EmptyState";
import { VehicleCard } from "../VehicleCard";

export const VehicleGrid: React.FC = () => {
  const { filteredVehicles } = useVehicleStore();

  if (filteredVehicles.length === 0)
    return (
      <EmptyState
        showBorder
        title="No vehicles found"
        description="We couldn't find any vehicles matching your current filters. Try adjusting your search criteria."
      />
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {filteredVehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
