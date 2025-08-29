import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isValidUSZipCode } from "@/utils/zipValidation";

interface ZipCodeStore {
  zipCode: string;
  isModalOpen: boolean;
  setZipCode: (zipCode: string) => void;
  openModal: () => void;
  closeModal: () => void;
  hasValidZipCode: () => boolean;
}

export const useZipCodeStore = create<ZipCodeStore>()(
  persist(
    (set, get) => ({
      zipCode: "",
      isModalOpen: false,
      setZipCode: (zipCode: string) => set({ zipCode }),
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
      hasValidZipCode: () => {
        const { zipCode } = get();
        return isValidUSZipCode(zipCode);
      },
    }),
    {
      name: "flexcar-zipcode",
      partialize: state => ({ zipCode: state.zipCode }),
    }
  )
);
