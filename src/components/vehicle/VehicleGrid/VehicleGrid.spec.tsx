import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useVehicleStore } from "@/store/vehicleStore";
import type { Vehicle } from "@/types/vehicle";
import { VehicleGrid } from "./index";

// Mock the vehicle store
vi.mock("@/store/vehicleStore", () => ({
  useVehicleStore: vi.fn(),
}));

// Mock child components
vi.mock("../../ui/EmptyState", () => ({
  EmptyState: ({
    title,
    description,
    showBorder,
  }: {
    title: string;
    description: string;
    showBorder: boolean;
  }) => (
    <div data-testid="empty-state" data-show-border={showBorder}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock("../VehicleCard", () => ({
  VehicleCard: ({ vehicle }: { vehicle: Vehicle }) => (
    <div data-testid="vehicle-card" data-vehicle-id={vehicle.id}>
      {vehicle.make} {vehicle.model}
    </div>
  ),
}));

describe("VehicleGrid Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state when no vehicles are available", () => {
    (useVehicleStore as any).mockReturnValue({
      filteredVehicles: [],
    });

    render(<VehicleGrid />);

    const emptyState = screen.getByTestId("empty-state");
    expect(emptyState).toBeInTheDocument();
    expect(screen.getByText("No vehicles found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We couldn't find any vehicles matching your current filters. Try adjusting your search criteria."
      )
    ).toBeInTheDocument();
    expect(emptyState).toHaveAttribute("data-show-border", "true");
  });

  it("renders vehicle cards when vehicles are available", () => {
    const mockVehicles: Vehicle[] = [
      {
        id: "1",
        make: "Toyota",
        model: "Corolla",
        trim: "LE",
        year: 2023,
        color: "Black",
        mileage: 12500,
        price: 24995,
        image: "toyota.webp",
      },
      {
        id: "2",
        make: "Honda",
        model: "Civic",
        trim: "Sport",
        year: 2024,
        color: "Blue",
        mileage: 8200,
        price: 28990,
        image: "honda.webp",
      },
    ];

    (useVehicleStore as any).mockReturnValue({
      filteredVehicles: mockVehicles,
    });

    render(<VehicleGrid />);

    const vehicleCards = screen.getAllByTestId("vehicle-card");
    expect(vehicleCards).toHaveLength(2);

    expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
    expect(screen.getByText("Honda Civic")).toBeInTheDocument();

    // Verify vehicle IDs are passed correctly
    expect(vehicleCards[0]).toHaveAttribute("data-vehicle-id", "1");
    expect(vehicleCards[1]).toHaveAttribute("data-vehicle-id", "2");
  });

  it("applies correct grid layout classes", () => {
    const mockVehicles: Vehicle[] = [
      {
        id: "1",
        make: "Toyota",
        model: "Corolla",
        trim: "LE",
        year: 2023,
        color: "Black",
        mileage: 12500,
        price: 24995,
        image: "toyota.webp",
      },
    ];

    (useVehicleStore as any).mockReturnValue({
      filteredVehicles: mockVehicles,
    });

    const { container } = render(<VehicleGrid />);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-6",
      "w-full"
    );
  });

  it("renders single vehicle correctly", () => {
    const mockVehicles: Vehicle[] = [
      {
        id: "1",
        make: "Tesla",
        model: "Model 3",
        trim: "Performance",
        year: 2024,
        color: "White",
        mileage: 3500,
        price: 54990,
        image: "tesla.webp",
      },
    ];

    (useVehicleStore as any).mockReturnValue({
      filteredVehicles: mockVehicles,
    });

    render(<VehicleGrid />);

    expect(screen.getByTestId("vehicle-card")).toBeInTheDocument();
    expect(screen.getByText("Tesla Model 3")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });

  it("renders large number of vehicles", () => {
    const mockVehicles: Vehicle[] = Array.from({ length: 20 }, (_, index) => ({
      id: `${index + 1}`,
      make: "Toyota",
      model: `Model${index + 1}`,
      trim: "Base",
      year: 2023,
      color: "Black",
      mileage: 10000,
      price: 25000,
      image: "car.webp",
    }));

    (useVehicleStore as any).mockReturnValue({
      filteredVehicles: mockVehicles,
    });

    render(<VehicleGrid />);

    const vehicleCards = screen.getAllByTestId("vehicle-card");
    expect(vehicleCards).toHaveLength(20);
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });
});
