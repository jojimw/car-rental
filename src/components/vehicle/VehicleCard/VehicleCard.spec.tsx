import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "./index";

// Mock image imports
vi.mock("@/assets/images/cars/toyota-corolla.webp", () => ({
  default: "mock-toyota-image.webp",
}));

describe("VehicleCard Component", () => {
  const mockVehicle: Vehicle = {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    trim: "LE",
    year: 2023,
    color: "Black",
    mileage: 12500,
    price: 24995,
    image: "mock-toyota-image.webp",
  };

  it("renders vehicle information correctly", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("2023") &&
          content.includes("Toyota") &&
          content.includes("Corolla")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, _element) => content.includes("Black"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("12,500") && content.includes("miles")
      )
    ).toBeInTheDocument();
    expect(screen.getByText("$24995/mo")).toBeInTheDocument();
  });

  it("renders vehicle image with proper alt text", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByAltText("2023 Toyota Corolla");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mock-toyota-image.webp");
  });

  it("formats mileage correctly for different values", () => {
    const vehicleWithHighMileage = { ...mockVehicle, mileage: 25000 };
    render(<VehicleCard vehicle={vehicleWithHighMileage} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("25,000") && content.includes("miles")
      )
    ).toBeInTheDocument();
  });

  it("formats mileage correctly for low values", () => {
    const vehicleWithLowMileage = { ...mockVehicle, mileage: 500 };
    render(<VehicleCard vehicle={vehicleWithLowMileage} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("500") && content.includes("miles")
      )
    ).toBeInTheDocument();
  });

  it("formats price with proper currency formatting", () => {
    const expensiveVehicle = { ...mockVehicle, price: 125000 };
    render(<VehicleCard vehicle={expensiveVehicle} />);

    expect(screen.getByText("$125000/mo")).toBeInTheDocument();
  });

  it("applies proper CSS classes for layout", () => {
    const { container } = render(<VehicleCard vehicle={mockVehicle} />);

    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass(
      "relative",
      "flex",
      "h-full",
      "flex-col",
      "justify-between",
      "overflow-hidden",
      "rounded-[16px]",
      "border",
      "border-gray-200",
      "bg-white",
      "cursor-pointer",
      "transition-shadow"
    );
  });

  it("renders vehicle details in correct sections", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    // Check that mileage and color are in the same section
    const detailsSection = screen
      .getByText((content, _element) => content.includes("Black"))
      .closest("div");
    expect(detailsSection).toContainElement(
      screen.getByText((content, _element) => content.includes("12,500"))
    );
  });

  it("handles different trim formats", () => {
    const vehicleWithoutTrim = { ...mockVehicle, trim: "" };
    render(<VehicleCard vehicle={vehicleWithoutTrim} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("2023") &&
          content.includes("Toyota") &&
          content.includes("Corolla")
      )
    ).toBeInTheDocument();
  });

  it("handles very high mileage values", () => {
    const vehicleWithHighMileage = { ...mockVehicle, mileage: 150000 };
    render(<VehicleCard vehicle={vehicleWithHighMileage} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("150,000") && content.includes("miles")
      )
    ).toBeInTheDocument();
  });
});
