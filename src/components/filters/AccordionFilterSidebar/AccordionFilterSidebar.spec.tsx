import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useVehicleStore } from "@/store/vehicleStore";
import { AccordionFilterSidebar } from "./index";

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

describe("AccordionFilterSidebar Component", () => {
  const mockResetFilters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useVehicleStore as any).mockReturnValue({
      selectedMakes: [],
      selectedColors: [],
      resetFilters: mockResetFilters,
    });
  });

  it("renders filter sidebar with title", () => {
    render(<AccordionFilterSidebar />);

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByTestId("filter-accordion-content")).toBeInTheDocument();
  });

  it("shows no active filter chips when no filters are selected", () => {
    render(<AccordionFilterSidebar />);

    expect(screen.getByTestId("clear-all-filters-button")).toBeDisabled();
  });

  it("shows filter chips for selected makes", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda"],
      selectedColors: [],
      resetFilters: mockResetFilters,
    });

    render(<AccordionFilterSidebar />);

    const allChips = screen.getAllByTestId("filter-chip-value");
    expect(allChips.length).toBe(2);
    expect(allChips?.[0]?.innerHTML).toEqual("Toyota");
    expect(allChips?.[1]?.innerHTML).toEqual("Honda");
  });

  it("shows filter chips for selected colors", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: [],
      selectedColors: ["Black", "White"],
      resetFilters: mockResetFilters,
    });

    render(<AccordionFilterSidebar />);

    const allChips = screen.getAllByTestId("filter-chip-value");
    expect(allChips.length).toBe(2);
    expect(allChips?.[0]?.innerHTML).toEqual("Black");
    expect(allChips?.[1]?.innerHTML).toEqual("White");
  });

  it("shows Clear all button when filters are active", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<AccordionFilterSidebar />);

    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("calls resetFilters when Clear all button is clicked", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<AccordionFilterSidebar />);

    const clearAllButton = screen.getByText("Clear all");
    fireEvent.click(clearAllButton);

    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });

  it("limits visible chips and shows expand button", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<AccordionFilterSidebar />);

    // Should show first 4 chips plus expand button
    const allChips = screen.getAllByTestId("filter-chip-value");
    expect(allChips.length).toBe(4);
    expect(allChips?.[0]?.innerHTML).toEqual("Toyota");
    expect(allChips?.[1]?.innerHTML).toEqual("Honda");
    expect(allChips?.[2]?.innerHTML).toEqual("Ford");
    expect(allChips?.[3]?.innerHTML).toEqual("Chevrolet");

    // Should show +2 more button
    expect(screen.getByText("Show 2 more")).toBeInTheDocument();

    // Hidden chips should not be visible initially
    expect(screen.queryByText("Nissan")).not.toBeInTheDocument();
  });

  it("expands to show all chips when expand button is clicked", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<AccordionFilterSidebar />);

    const expandButton = screen.getByText("Show 2 more");
    fireEvent.click(expandButton);

    // All chips should now be visible
    const allChips = screen.getAllByTestId("filter-chip-value");
    expect(allChips.length).toBe(6);
    expect(allChips?.[0]?.innerHTML).toEqual("Toyota");
    expect(allChips?.[1]?.innerHTML).toEqual("Honda");
    expect(allChips?.[2]?.innerHTML).toEqual("Ford");
    expect(allChips?.[3]?.innerHTML).toEqual("Chevrolet");
    expect(allChips?.[4]?.innerHTML).toEqual("Nissan");
    expect(allChips?.[5]?.innerHTML).toEqual("Black");

    // Expand button should change to collapse
    expect(screen.getByText("Show less")).toBeInTheDocument();
    expect(screen.queryByText("Show 2 more")).not.toBeInTheDocument();
  });

  it("collapses chips when Show less button is clicked", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"],
      selectedColors: ["Black"],
      resetFilters: mockResetFilters,
    });

    render(<AccordionFilterSidebar />);

    // First expand
    const expandButton = screen.getByText("Show 2 more");
    fireEvent.click(expandButton);

    // Then collapse
    const collapseButton = screen.getByText("Show less");
    fireEvent.click(collapseButton);

    // Should be back to limited view
    expect(screen.getByText("Show 2 more")).toBeInTheDocument();
    expect(screen.queryByText("Show less")).not.toBeInTheDocument();
  });
});
