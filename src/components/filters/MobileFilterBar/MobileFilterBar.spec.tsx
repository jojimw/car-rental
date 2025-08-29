import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useVehicleStore } from "@/store/vehicleStore";
import { MobileFilterBar } from "./index";

// Mock the vehicle store
vi.mock("@/store/vehicleStore", () => ({
  useVehicleStore: vi.fn(),
}));

describe("MobileFilterBar Component", () => {
  const mockResetFilters = vi.fn();
  const mockOnOpenModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useVehicleStore as any).mockReturnValue({
      selectedMakes: [],
      selectedColors: [],
      resetFilters: mockResetFilters,
      toggleMake: vi.fn(),
      toggleColor: vi.fn(),
    });
  });

  it("renders filter button", () => {
    render(<MobileFilterBar onOpenModal={mockOnOpenModal} />);

    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("calls onOpenModal when filter button is clicked", () => {
    render(<MobileFilterBar onOpenModal={mockOnOpenModal} />);

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
  });

  it("shows filter count when filters are active", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<MobileFilterBar onOpenModal={mockOnOpenModal} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("Filter") && content.includes("(3)")
      )
    ).toBeInTheDocument();
  });

  it("applies mobile-only visibility classes", () => {
    const { container } = render(
      <MobileFilterBar onOpenModal={mockOnOpenModal} />
    );

    const mobileBar = container.firstChild;
    expect(mobileBar).toHaveClass("lg:hidden");
  });

  it("combines makes and colors for total filter count", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda", "Ford"],
      selectedColors: ["Black", "White"],
      resetFilters: mockResetFilters,
    });

    render(<MobileFilterBar onOpenModal={mockOnOpenModal} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("Filter") && content.includes("(5)")
      )
    ).toBeInTheDocument();
  });

  it("shows filter icon in button", () => {
    render(<MobileFilterBar onOpenModal={mockOnOpenModal} />);

    const filterIcon = document.querySelector("svg");
    expect(filterIcon).toBeInTheDocument();
  });

  it("handles empty filter arrays correctly", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: [],
      selectedColors: [],
      resetFilters: mockResetFilters,
    });

    render(<MobileFilterBar onOpenModal={mockOnOpenModal} />);

    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(
      screen.queryByText(
        (content, _element) =>
          content.includes("Filter") && content.includes("(0)")
      )
    ).not.toBeInTheDocument();
  });

  it("handles single filter correctly", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota"],
      selectedColors: [],
      resetFilters: mockResetFilters,
    });

    render(<MobileFilterBar onOpenModal={mockOnOpenModal} />);

    expect(
      screen.getByText(
        (content, _element) =>
          content.includes("Filter") && content.includes("(1)")
      )
    ).toBeInTheDocument();
  });
});
