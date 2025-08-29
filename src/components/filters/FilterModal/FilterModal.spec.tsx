import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useVehicleStore } from "@/store/vehicleStore";
import { FilterModal } from "./index";

// Mock the vehicle store
vi.mock("@/store/vehicleStore", () => ({
  useVehicleStore: vi.fn(),
}));

// Mock the FilterAccordionContent component
vi.mock("../FilterAccordionContent", () => ({
  FilterAccordionContent: () => (
    <div data-testid="filter-accordion-content">Filter Content</div>
  ),
}));

describe("FilterModal Component", () => {
  const mockResetFilters = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useVehicleStore as any).mockReturnValue({
      selectedMakes: [],
      selectedColors: [],
      resetFilters: mockResetFilters,
    });
  });

  it("does not render when isOpen is false", () => {
    render(<FilterModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText("Filters")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(<FilterModal isOpen onClose={mockOnClose} />);

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Apply Filters")).toBeInTheDocument();
    expect(screen.getByTestId("filter-accordion-content")).toBeInTheDocument();
  });

  it("shows filter count when filters are active", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<FilterModal isOpen onClose={mockOnClose} />);

    expect(screen.getByText("Filters (3)")).toBeInTheDocument();
  });

  it("shows clear all button when filters are active", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<FilterModal isOpen onClose={mockOnClose} />);

    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("does not show clear all button when no filters are active", () => {
    render(<FilterModal isOpen onClose={mockOnClose} />);

    expect(screen.queryByText("Clear all")).not.toBeInTheDocument();
  });

  it("calls resetFilters when clear all button is clicked", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<FilterModal isOpen onClose={mockOnClose} />);

    const clearAllButton = screen.getByText("Clear all");
    fireEvent.click(clearAllButton);

    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    render(<FilterModal isOpen onClose={mockOnClose} />);

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Apply Filters button is clicked", () => {
    render(<FilterModal isOpen onClose={mockOnClose} />);

    const applyButton = screen.getByText("Apply Filters");
    fireEvent.click(applyButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("has proper modal structure and accessibility", () => {
    render(<FilterModal isOpen onClose={mockOnClose} />);

    // Check for proper dialog structure
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Filter vehicles by make and color to find your perfect match."
      )
    ).toBeInTheDocument();
  });

  it("applies correct CSS classes for mobile layout", () => {
    render(<FilterModal isOpen onClose={mockOnClose} />);

    const modalContent = screen.getByRole("dialog");
    expect(modalContent).toHaveClass("lg:hidden");
  });

  it("closes modal when overlay is clicked", () => {
    render(<FilterModal isOpen onClose={mockOnClose} />);

    const overlay = document.querySelector("[data-radix-dialog-overlay]");
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it("handles combined filter count correctly", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda", "Ford"],
      selectedColors: ["Black", "White"],
      resetFilters: mockResetFilters,
    });

    render(<FilterModal isOpen onClose={mockOnClose} />);

    expect(screen.getByText("Filters (5)")).toBeInTheDocument();
  });
});
