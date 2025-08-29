import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useVehicleStore } from "./vehicleStore";

// Mock the vehicles data
vi.mock("../data/vehicles", () => ({
  mockVehicles: [
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
    {
      id: "3",
      make: "Toyota",
      model: "Camry",
      trim: "XLE",
      year: 2023,
      color: "White",
      mileage: 15000,
      price: 32000,
      image: "toyota2.webp",
    },
  ],
}));

const testVehicles = [
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
  {
    id: "3",
    make: "Toyota",
    model: "Camry",
    trim: "XLE",
    year: 2023,
    color: "White",
    mileage: 15000,
    price: 32000,
    image: "toyota2.webp",
  },
];

describe("VehicleStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useVehicleStore.setState({
      vehicles: [],
      filteredVehicles: [],
      isLoading: false,
      selectedMakes: [],
      selectedColors: [],
      sortOption: "price-low",
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe("Initial State", () => {
    it("has correct initial state", () => {
      expect(useVehicleStore.getState().vehicles).toEqual([]);
      expect(useVehicleStore.getState().filteredVehicles).toEqual([]);
      expect(useVehicleStore.getState().isLoading).toBe(false);
      expect(useVehicleStore.getState().selectedMakes).toEqual([]);
      expect(useVehicleStore.getState().selectedColors).toEqual([]);
      expect(useVehicleStore.getState().sortOption).toBe("price-low");
    });
  });

  describe("Loading State", () => {
    it("sets loading state", () => {
      useVehicleStore.getState().setLoading(true);
      expect(useVehicleStore.getState().isLoading).toBe(true);

      useVehicleStore.getState().setLoading(false);
      expect(useVehicleStore.getState().isLoading).toBe(false);
    });
  });

  describe("Vehicle Management", () => {
    it("sets vehicles", () => {
      const vehiclesSlice = testVehicles.slice(0, 2);

      useVehicleStore.getState().setVehicles(vehiclesSlice);
      expect(useVehicleStore.getState().vehicles).toEqual(vehiclesSlice);
    });

    it("loads vehicles with delay simulation", async () => {
      vi.useFakeTimers();

      useVehicleStore.getState().loadVehicles();
      expect(useVehicleStore.getState().isLoading).toBe(true);

      // Fast-forward time to simulate loading delay
      vi.advanceTimersByTime(1500);
      await vi.runAllTimersAsync();

      expect(useVehicleStore.getState().isLoading).toBe(false);
      expect(useVehicleStore.getState().vehicles).toEqual(testVehicles);
      expect(
        useVehicleStore.getState().filteredVehicles.length
      ).toBeGreaterThan(0);
    });
  });

  describe("Filtering", () => {
    beforeEach(() => {
      useVehicleStore.getState().setVehicles(testVehicles);
      useVehicleStore.getState().applyFiltersAndSort();
    });

    it("filters by single make", async () => {
      vi.useFakeTimers();

      useVehicleStore.getState().toggleMake("Toyota");
      expect(useVehicleStore.getState().isLoading).toBe(true);

      vi.advanceTimersByTime(500);
      await vi.runAllTimersAsync();

      expect(useVehicleStore.getState().isLoading).toBe(false);
      expect(useVehicleStore.getState().selectedMakes).toContain("Toyota");
      expect(useVehicleStore.getState().filteredVehicles).toHaveLength(2);
      expect(
        useVehicleStore
          .getState()
          .filteredVehicles.every(v => v.make === "Toyota")
      ).toBe(true);
    });

    it("applies filters and sort together", () => {
      // Manually modify state for testing
      useVehicleStore.setState({
        ...useVehicleStore.getState(),
        selectedMakes: ["Toyota"],
        sortOption: "price-high",
      });

      useVehicleStore.getState().applyFiltersAndSort();

      expect(useVehicleStore.getState().filteredVehicles).toHaveLength(2);
      expect(
        useVehicleStore.getState().filteredVehicles[0]?.price
      ).toBeGreaterThan(
        useVehicleStore.getState().filteredVehicles[1]?.price ?? 0
      );
      expect(
        useVehicleStore
          .getState()
          .filteredVehicles.every(v => v.make === "Toyota")
      ).toBe(true);
    });
  });

  describe("Sorting", () => {
    beforeEach(() => {
      useVehicleStore.getState().setVehicles(testVehicles);
      useVehicleStore.getState().applyFiltersAndSort();
    });

    it("sorts by price low to high", async () => {
      vi.useFakeTimers();

      useVehicleStore.getState().setSortOption("price-low");
      vi.advanceTimersByTime(500);
      await vi.runAllTimersAsync();

      expect(useVehicleStore.getState().sortOption).toBe("price-low");
      const prices = useVehicleStore
        .getState()
        .filteredVehicles.map(v => v.price);
      expect(prices).toEqual([24995, 28990, 32000]);
    });

    it("sorts by price high to low", async () => {
      vi.useFakeTimers();

      useVehicleStore.getState().setSortOption("price-high");
      vi.advanceTimersByTime(500);
      await vi.runAllTimersAsync();

      expect(useVehicleStore.getState().sortOption).toBe("price-high");
      const prices = useVehicleStore
        .getState()
        .filteredVehicles.map(v => v.price);
      expect(prices).toEqual([32000, 28990, 24995]);
    });

    it("sorts by make A-Z", async () => {
      vi.useFakeTimers();

      useVehicleStore.getState().setSortOption("make-az");
      vi.advanceTimersByTime(500);
      await vi.runAllTimersAsync();

      expect(useVehicleStore.getState().sortOption).toBe("make-az");
      const makes = useVehicleStore
        .getState()
        .filteredVehicles.map(v => v.make);
      expect(makes).toEqual(["Honda", "Toyota", "Toyota"]);
    });
  });

  describe("Reset Filters", () => {
    it("resets all filters to initial state", () => {
      // Set some filters
      useVehicleStore.getState().setVehicles(testVehicles);
      useVehicleStore.setState({
        ...useVehicleStore.getState(),
        selectedMakes: ["Toyota"],
        selectedColors: ["Black"],
        sortOption: "price-high",
      });

      // Reset filters
      useVehicleStore.getState().resetFilters();

      expect(useVehicleStore.getState().selectedMakes).toEqual([]);
      expect(useVehicleStore.getState().selectedColors).toEqual([]);
      expect(useVehicleStore.getState().sortOption).toBe("price-low");
    });
  });
});
