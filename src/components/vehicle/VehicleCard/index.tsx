import React from "react";
import { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const formatPrice = (price: number): string => {
    return `$${price}/mo`;
  };

  const formatMileage = (mileage: number): string => {
    return new Intl.NumberFormat("en-US").format(mileage);
  };

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[16px] border border-gray-200 bg-white cursor-pointer transition-shadow duration-50 hover:shadow-[0px_6px_32px_#0A00291A,0px_8px_30px_#2A00A50F]">
      <div className="relative h-full w-full">
        <div className="relative w-full" style={{ paddingBottom: "75%" }}>
          <div className="absolute inset-0">
            <img
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              loading="lazy"
              className="h-full w-full object-cover"
              src={vehicle.image}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="font-semibold text-gray-900">
          {vehicle.year}・{vehicle.make} {vehicle.model}
        </p>
        <p className="text-sm text-gray-600">
          {vehicle.trim}・{formatMileage(vehicle.mileage)} miles・
          {vehicle.color}
        </p>
        <div className="h-[8px] flex-shrink-0" />
        <h3 className="text-2xl font-bold text-gray-900">
          {formatPrice(vehicle.price)}
        </h3>
      </div>
    </div>
  );
};
