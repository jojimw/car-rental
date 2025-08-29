export interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  image: string;
}

export type SortOption = "price-high" | "price-low" | "make-az";

export interface ZipCodeState {
  zipCode: string;
  isValid: boolean;
  isModalOpen: boolean;
}

export const VEHICLE_MAKES = [
  "Buick",
  "Chevrolet",
  "Dodge",
  "Ford",
  "GMC",
  "Genesis",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lincoln",
  "Mazda",
  "Mitsubishi",
  "Nissan",
  "Ram",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
] as const;

export const VEHICLE_COLORS = [
  "Black",
  "Blue",
  "Grey",
  "Red",
  "Silver",
  "White",
  "Others",
] as const;
