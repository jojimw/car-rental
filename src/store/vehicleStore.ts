import { create } from "zustand";
import { mockVehicles } from "../data/vehicles";
import { Vehicle, SortOption } from "../types/vehicle";

interface VehicleStore {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  isLoading: boolean;
  selectedMakes: string[];
  selectedColors: string[];
  sortOption: SortOption;
  setVehicles: (vehicles: Vehicle[]) => void;
  setLoading: (loading: boolean) => void;
  toggleMake: (make: string) => void;
  toggleColor: (color: string) => void;
  setSortOption: (option: SortOption) => void;
  applyFiltersAndSort: () => void;
  loadVehicles: () => void;
  resetFilters: () => void;
}

const sortVehicles = (
  vehicles: Vehicle[],
  sortOption: SortOption
): Vehicle[] => {
  switch (sortOption) {
    case "price-high":
      return [...vehicles].sort((a, b) => b.price - a.price);
    case "price-low":
      return [...vehicles].sort((a, b) => a.price - b.price);
    case "make-az":
      return [...vehicles].sort((a, b) => a.make.localeCompare(b.make));
    default:
      return vehicles;
  }
};

const filterVehicles = (
  vehicles: Vehicle[],
  selectedMakes: string[],
  selectedColors: string[]
): Vehicle[] => {
  let filtered = vehicles;

  if (selectedMakes.length > 0)
    filtered = filtered.filter(vehicle => selectedMakes.includes(vehicle.make));

  if (selectedColors.length > 0)
    filtered = filtered.filter(vehicle =>
      selectedColors.includes(vehicle.color)
    );

  return filtered;
};

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: [],
  filteredVehicles: [],
  isLoading: false,
  selectedMakes: [],
  selectedColors: [],
  sortOption: "price-low",

  setVehicles: vehicles => set({ vehicles }),
  setLoading: isLoading => set({ isLoading }),
  toggleMake: make => {
    const { selectedMakes } = get();
    const newMakes = selectedMakes.includes(make)
      ? selectedMakes.filter(m => m !== make)
      : [...selectedMakes, make];
    set({ selectedMakes: newMakes, isLoading: true });
    // Simulate loading delay
    setTimeout(() => {
      get().applyFiltersAndSort();
      set({ isLoading: false });
    }, 500);
  },
  toggleColor: color => {
    const { selectedColors } = get();
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    set({ selectedColors: newColors, isLoading: true });
    // Simulate loading delay
    setTimeout(() => {
      get().applyFiltersAndSort();
      set({ isLoading: false });
    }, 500);
  },
  setSortOption: sortOption => {
    set({ sortOption, isLoading: true });
    // Simulate loading delay
    setTimeout(() => {
      get().applyFiltersAndSort();
      set({ isLoading: false });
    }, 500);
  },

  applyFiltersAndSort: () => {
    const { vehicles, selectedMakes, selectedColors, sortOption } = get();
    const filtered = filterVehicles(vehicles, selectedMakes, selectedColors);
    const sorted = sortVehicles(filtered, sortOption);
    set({ filteredVehicles: sorted });
  },

  loadVehicles: () => {
    set({ isLoading: true });

    // Simulate loading delay
    setTimeout(() => {
      set({ vehicles: mockVehicles, isLoading: false });
      get().applyFiltersAndSort();
    }, 1500);
  },

  resetFilters: () => {
    set({ selectedMakes: [], selectedColors: [], sortOption: "price-low" });
    get().applyFiltersAndSort();
  },
}));
