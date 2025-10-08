import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { useZipCodeStore } from "@/store/zipCodeStore";
import {
  isValidUSZipCode,
  getZipCodeErrorMessage,
} from "@/utils/zipValidation";

interface ZipCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZipCodeModal: React.FC<ZipCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const { setZipCode, closeModal } = useZipCodeStore();
  const { loadVehicles } = useVehicleStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidUSZipCode(inputValue)) {
      setError(getZipCodeErrorMessage(inputValue));
      return;
    }

    setError("");
    setZipCode(inputValue);
    closeModal();
    loadVehicles();
    onClose();
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 mx-4">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-semibold text-gray-900">
              Find rental cars near you
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-gray-600 mb-6">
            Enter your ZIP code to see accurate availability and delivery
            options in your area.
          </Dialog.Description>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zipcode"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter ZIP code"
                className={`w-full px-4 py-3 border rounded-lg focus:border-transparent transition-colors ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                maxLength={10}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Next
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
