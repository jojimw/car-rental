import { describe, it, expect, beforeEach } from "vitest";
import { useZipCodeStore } from "./zipCodeStore";

describe("ZipCodeStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useZipCodeStore.setState({
      zipCode: "",
      isModalOpen: false,
    });
  });

  it("has correct initial state", () => {
    expect(useZipCodeStore.getState().zipCode).toBe("");
    expect(useZipCodeStore.getState().isModalOpen).toBe(false);
  });

  it("sets ZIP code", () => {
    useZipCodeStore.getState().setZipCode("12345");
    expect(useZipCodeStore.getState().zipCode).toBe("12345");
    expect(useZipCodeStore.getState().hasValidZipCode()).toBe(true);
  });

  it("validates ZIP+4 code", () => {
    useZipCodeStore.getState().setZipCode("12345-6789");
    expect(useZipCodeStore.getState().hasValidZipCode()).toBe(true);
  });

  it("rejects invalid ZIP code", () => {
    useZipCodeStore.getState().setZipCode("invalid");
    expect(useZipCodeStore.getState().hasValidZipCode()).toBe(false);
  });

  it("opens and closes modal", () => {
    useZipCodeStore.getState().openModal();
    expect(useZipCodeStore.getState().isModalOpen).toBe(true);
    useZipCodeStore.getState().closeModal();
    expect(useZipCodeStore.getState().isModalOpen).toBe(false);
  });

  it("persists ZIP code to localStorage", () => {
    useZipCodeStore.getState().setZipCode("12345");
    expect(localStorage.getItem("flexcar-zipcode")).toContain("12345");
  });
});
