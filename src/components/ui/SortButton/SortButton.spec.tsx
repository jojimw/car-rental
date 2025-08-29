import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useVehicleStore } from "@/store/vehicleStore";
import { SortButton } from "./index";

// Mock the vehicle store
vi.mock("@/store/vehicleStore", () => ({
  useVehicleStore: vi.fn(),
}));

describe("SortButton Component", () => {
  const mockSetSortOption = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementation
    (useVehicleStore as any).mockReturnValue({
      sortOption: "price-low",
      setSortOption: mockSetSortOption,
    });
  });

  it("renders sort button with default text", () => {
    render(<SortButton />);

    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByText("Price: Low to high")).toBeInTheDocument();
  });

  it("displays correct sort option text for price-low", () => {
    render(<SortButton />);

    expect(screen.getByText("Price: Low to high")).toBeInTheDocument();
  });

  it("displays correct sort option text for price-high", () => {
    (useVehicleStore as any).mockReturnValue({
      sortOption: "price-high",
      setSortOption: mockSetSortOption,
    });

    render(<SortButton />);

    expect(screen.getByText("Price: High to low")).toBeInTheDocument();
  });

  it("displays correct sort option text for make-az", () => {
    (useVehicleStore as any).mockReturnValue({
      sortOption: "make-az",
      setSortOption: mockSetSortOption,
    });

    render(<SortButton />);

    expect(screen.getByText("Make A-Z")).toBeInTheDocument();
  });

  it("opens popover when clicked", async () => {
    render(<SortButton />);

    const sortButton = screen.getByRole("button");
    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(screen.getAllByText("Price: Low to high")).toHaveLength(2);
      expect(screen.getByText("Price: High to low")).toBeInTheDocument();
      expect(screen.getByText("Make A-Z")).toBeInTheDocument();
    });
  });

  it("calls setSortOption when sort option is selected", async () => {
    render(<SortButton />);

    // Open popover
    const sortButton = screen.getByRole("button");
    fireEvent.click(sortButton);

    await waitFor(() => {
      const priceHighOption = screen.getByText("Price: High to low");
      fireEvent.click(priceHighOption);
    });

    expect(mockSetSortOption).toHaveBeenCalledWith("price-high");
  });

  it("shows active state for current sort option", async () => {
    (useVehicleStore as any).mockReturnValue({
      sortOption: "price-high",
      setSortOption: mockSetSortOption,
    });

    render(<SortButton />);

    const sortButton = screen.getByRole("button");
    fireEvent.click(sortButton);

    await waitFor(() => {
      const popover = screen.getByRole("listbox");
      const activeOption = within(popover).getByText("Price: High to low");
      expect(activeOption.closest("button")).toHaveClass("bg-gray-100");
    });
  });
});
