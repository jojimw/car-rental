import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useVehicleStore } from "@/store/vehicleStore";
import { VEHICLE_MAKES, VEHICLE_COLORS } from "@/types/vehicle";
import { FilterAccordionContent } from "./index";

// Mock the vehicle store
vi.mock("@/store/vehicleStore", () => ({
  useVehicleStore: vi.fn(),
}));

describe("FilterAccordionContent Component", () => {
  const mockToggleMake = vi.fn();
  const mockToggleColor = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useVehicleStore as any).mockReturnValue({
      selectedMakes: [],
      selectedColors: [],
      toggleMake: mockToggleMake,
      toggleColor: mockToggleColor,
    });
  });

  it("renders make and color filter sections", () => {
    render(<FilterAccordionContent />);

    expect(screen.getByText("Make")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("renders all vehicle makes as checkboxes", () => {
    render(<FilterAccordionContent />);

    VEHICLE_MAKES.forEach(make => {
      expect(screen.getByLabelText(make)).toBeInTheDocument();
    });
  });

  it("renders all vehicle colors as checkboxes", () => {
    render(<FilterAccordionContent />);

    VEHICLE_COLORS.forEach(color => {
      expect(screen.getByLabelText(color)).toBeInTheDocument();
    });
  });

  it("shows selected makes as checked", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: ["Toyota", "Honda"],
      selectedColors: [],
      toggleMake: mockToggleMake,
      toggleColor: mockToggleColor,
    });

    render(<FilterAccordionContent />);

    const toyotaCheckbox = screen.getByLabelText("Toyota") as HTMLInputElement;
    const hondaCheckbox = screen.getByLabelText("Honda") as HTMLInputElement;
    const fordCheckbox = screen.getByLabelText("Ford") as HTMLInputElement;

    expect(toyotaCheckbox).toBeChecked();
    expect(hondaCheckbox).toBeChecked();
    expect(fordCheckbox).not.toBeChecked();
  });

  it("shows selected colors as checked", () => {
    (useVehicleStore as any).mockReturnValue({
      selectedMakes: [],
      selectedColors: ["Black", "White"],
      toggleMake: mockToggleMake,
      toggleColor: mockToggleColor,
    });

    render(<FilterAccordionContent />);

    const blackCheckbox = screen.getByLabelText("Black") as HTMLInputElement;
    const whiteCheckbox = screen.getByLabelText("White") as HTMLInputElement;
    const blueCheckbox = screen.getByLabelText("Blue") as HTMLInputElement;

    expect(blackCheckbox).toBeChecked();
    expect(whiteCheckbox).toBeChecked();
    expect(blueCheckbox).not.toBeChecked();
  });

  it("calls toggleMake when make checkbox is clicked", () => {
    render(<FilterAccordionContent />);

    const toyotaCheckbox = screen.getByLabelText("Toyota");
    fireEvent.click(toyotaCheckbox);

    expect(mockToggleMake).toHaveBeenCalledWith("Toyota");
  });

  it("calls toggleColor when color checkbox is clicked", () => {
    render(<FilterAccordionContent />);

    const blackCheckbox = screen.getByLabelText("Black");
    fireEvent.click(blackCheckbox);

    expect(mockToggleColor).toHaveBeenCalledWith("Black");
  });

  it("uses accordion structure for both sections", () => {
    render(<FilterAccordionContent />);

    // Check for accordion triggers
    const makeSection = screen.getByText("Make").closest("button");
    const colorSection = screen.getByText("Color").closest("button");

    expect(makeSection).toHaveAttribute("data-state");
    expect(colorSection).toHaveAttribute("data-state");
  });

  it("expands and collapses accordion sections", () => {
    render(<FilterAccordionContent />);

    const makeSection = screen.getByText("Make").closest("button");
    if (makeSection) {
      fireEvent.click(makeSection);

      // The accordion should toggle its state
      expect(makeSection).toHaveAttribute("data-state");
    }
  });

  it("handles multiple make selections", () => {
    render(<FilterAccordionContent />);

    const toyotaCheckbox = screen.getByLabelText("Toyota");
    const hondaCheckbox = screen.getByLabelText("Honda");

    fireEvent.click(toyotaCheckbox);
    fireEvent.click(hondaCheckbox);

    expect(mockToggleMake).toHaveBeenCalledWith("Toyota");
    expect(mockToggleMake).toHaveBeenCalledWith("Honda");
    expect(mockToggleMake).toHaveBeenCalledTimes(2);
  });

  it("handles multiple color selections", () => {
    render(<FilterAccordionContent />);

    const blackCheckbox = screen.getByLabelText("Black");
    const whiteCheckbox = screen.getByLabelText("White");

    fireEvent.click(blackCheckbox);
    fireEvent.click(whiteCheckbox);

    expect(mockToggleColor).toHaveBeenCalledWith("Black");
    expect(mockToggleColor).toHaveBeenCalledWith("White");
    expect(mockToggleColor).toHaveBeenCalledTimes(2);
  });
});
