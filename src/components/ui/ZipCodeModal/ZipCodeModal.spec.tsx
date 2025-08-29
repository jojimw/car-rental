import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useVehicleStore } from "@/store/vehicleStore";
import { useZipCodeStore } from "@/store/zipCodeStore";
import { ZipCodeModal } from "./index";

// Mock the stores
vi.mock("@/store/zipCodeStore", () => ({
  useZipCodeStore: vi.fn(),
}));

vi.mock("@/store/vehicleStore", () => ({
  useVehicleStore: vi.fn(),
}));

describe("ZipCodeModal Component", () => {
  const mockSetZipCode = vi.fn();
  const mockCloseModal = vi.fn();
  const mockLoadVehicles = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useZipCodeStore as any).mockReturnValue({
      zipCode: "",
      setZipCode: mockSetZipCode,
      closeModal: mockCloseModal,
    });

    (useVehicleStore as any).mockReturnValue({
      loadVehicles: mockLoadVehicles,
    });
  });

  it("renders modal when isOpen is true", () => {
    render(<ZipCodeModal isOpen onClose={mockOnClose} />);

    expect(screen.getByText("Find Flexcars near you")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Enter your ZIP code to see accurate availability and delivery options in your area."
      )
    ).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    render(<ZipCodeModal isOpen={false} onClose={mockOnClose} />);

    expect(
      screen.queryByText("Find Flexcars near you")
    ).not.toBeInTheDocument();
  });

  it("renders input field and submit button", () => {
    render(<ZipCodeModal isOpen onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Enter ZIP code")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<ZipCodeModal isOpen onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText(
      "Enter ZIP code"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12345" } });

    expect(input.value).toBe("12345");
  });

  it("shows error message for invalid ZIP code", async () => {
    render(<ZipCodeModal isOpen onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText("Enter ZIP code");
    const button = screen.getByText("Next");

    fireEvent.change(input, { target: { value: "invalid" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid US zip code.")
      ).toBeInTheDocument();
    });
  });

  it("calls setZipCode and loadVehicles on valid submission", async () => {
    render(<ZipCodeModal isOpen onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText("Enter ZIP code");
    const button = screen.getByText("Next");

    fireEvent.change(input, { target: { value: "12345" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetZipCode).toHaveBeenCalledWith("12345");
      expect(mockCloseModal).toHaveBeenCalled();
      expect(mockLoadVehicles).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("handles form submission via Enter key", async () => {
    render(<ZipCodeModal isOpen onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText("Enter ZIP code");
    const form = input.closest("form");

    fireEvent.change(input, { target: { value: "12345" } });
    if (form) fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSetZipCode).toHaveBeenCalledWith("12345");
      expect(mockCloseModal).toHaveBeenCalled();
      expect(mockLoadVehicles).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
