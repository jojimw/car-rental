import { describe, it, expect } from "vitest";
import { isValidUSZipCode, getZipCodeErrorMessage } from "./zipValidation";

describe("ZIP Code Validation Utilities", () => {
  describe("isValidUSZipCode", () => {
    describe("Valid ZIP codes", () => {
      it("validates 5-digit ZIP codes", () => {
        expect(isValidUSZipCode("12345")).toBe(true);
        expect(isValidUSZipCode("00000")).toBe(true);
        expect(isValidUSZipCode("99999")).toBe(true);
        expect(isValidUSZipCode("90210")).toBe(true);
      });

      it("validates ZIP+4 format", () => {
        expect(isValidUSZipCode("12345-6789")).toBe(true);
        expect(isValidUSZipCode("00000-0000")).toBe(true);
        expect(isValidUSZipCode("99999-9999")).toBe(true);
        expect(isValidUSZipCode("90210-1234")).toBe(true);
      });

      it("handles ZIP codes with leading/trailing whitespace", () => {
        expect(isValidUSZipCode("  12345  ")).toBe(true);
        expect(isValidUSZipCode("\t12345-6789\t")).toBe(true);
        expect(isValidUSZipCode("\n12345\n")).toBe(true);
        expect(isValidUSZipCode("   90210-1234   ")).toBe(true);
      });
    });

    describe("Invalid ZIP codes", () => {
      it("rejects ZIP codes that are too short", () => {
        expect(isValidUSZipCode("1234")).toBe(false);
        expect(isValidUSZipCode("123")).toBe(false);
        expect(isValidUSZipCode("12")).toBe(false);
        expect(isValidUSZipCode("1")).toBe(false);
      });

      it("rejects ZIP codes that are too long", () => {
        expect(isValidUSZipCode("123456")).toBe(false);
        expect(isValidUSZipCode("1234567890")).toBe(false);
        expect(isValidUSZipCode("12345-67890")).toBe(false);
        expect(isValidUSZipCode("123456-7890")).toBe(false);
      });

      it("rejects ZIP codes with letters", () => {
        expect(isValidUSZipCode("1234a")).toBe(false);
        expect(isValidUSZipCode("a2345")).toBe(false);
        expect(isValidUSZipCode("12a45")).toBe(false);
        expect(isValidUSZipCode("12345-678a")).toBe(false);
        expect(isValidUSZipCode("abcde")).toBe(false);
      });

      it("rejects ZIP codes with special characters", () => {
        expect(isValidUSZipCode("12345@")).toBe(false);
        expect(isValidUSZipCode("12345#")).toBe(false);
        expect(isValidUSZipCode("12345$")).toBe(false);
        expect(isValidUSZipCode("12345%")).toBe(false);
        expect(isValidUSZipCode("12345*")).toBe(false);
        expect(isValidUSZipCode("12345+6789")).toBe(false);
        expect(isValidUSZipCode("12345_6789")).toBe(false);
      });

      it("rejects empty strings", () => {
        expect(isValidUSZipCode("")).toBe(false);
        expect(isValidUSZipCode("   ")).toBe(false);
        expect(isValidUSZipCode("\t\n")).toBe(false);
      });

      it("rejects malformed ZIP+4 codes", () => {
        expect(isValidUSZipCode("12345-")).toBe(false);
        expect(isValidUSZipCode("-6789")).toBe(false);
        expect(isValidUSZipCode("12345-67")).toBe(false);
        expect(isValidUSZipCode("12345-678")).toBe(false);
        expect(isValidUSZipCode("12345-67890")).toBe(false);
        expect(isValidUSZipCode("1234-6789")).toBe(false);
        expect(isValidUSZipCode("123456-789")).toBe(false);
      });

      it("rejects ZIP codes with multiple dashes", () => {
        expect(isValidUSZipCode("12345-67-89")).toBe(false);
        expect(isValidUSZipCode("12-345-6789")).toBe(false);
        expect(isValidUSZipCode("12345--6789")).toBe(false);
      });

      it("rejects ZIP codes with spaces in wrong places", () => {
        expect(isValidUSZipCode("123 45")).toBe(false);
        expect(isValidUSZipCode("12345 6789")).toBe(false);
        expect(isValidUSZipCode("12345- 6789")).toBe(false);
        expect(isValidUSZipCode("12345 -6789")).toBe(false);
      });
    });
  });

  describe("getZipCodeErrorMessage", () => {
    describe("Empty ZIP code handling", () => {
      it("returns required message for empty string", () => {
        expect(getZipCodeErrorMessage("")).toBe("ZIP code is required");
      });

      it("returns required message for whitespace-only string", () => {
        expect(getZipCodeErrorMessage("   ")).toBe("ZIP code is required");
        expect(getZipCodeErrorMessage("\t")).toBe("ZIP code is required");
        expect(getZipCodeErrorMessage("\n")).toBe("ZIP code is required");
        expect(getZipCodeErrorMessage("\t\n   ")).toBe("ZIP code is required");
      });
    });

    describe("Invalid ZIP code handling", () => {
      it("returns validation message for invalid format", () => {
        const expectedMessage = "Please enter a valid US zip code.";

        expect(getZipCodeErrorMessage("1234")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("123456")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("12345a")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("abcde")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("12345-")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("12345-67")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("12345@")).toBe(expectedMessage);
      });

      it("returns validation message for partially entered codes", () => {
        const expectedMessage = "Please enter a valid US zip code.";

        expect(getZipCodeErrorMessage("1")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("12")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("123")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("1234")).toBe(expectedMessage);
      });

      it("returns validation message for malformed ZIP+4", () => {
        const expectedMessage = "Please enter a valid US zip code.";

        expect(getZipCodeErrorMessage("12345-678")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("1234-6789")).toBe(expectedMessage);
        expect(getZipCodeErrorMessage("12345-67890")).toBe(expectedMessage);
      });
    });

    describe("Message consistency", () => {
      it("uses consistent error messages", () => {
        const requiredMessage = "ZIP code is required";
        const invalidMessage = "Please enter a valid US zip code.";

        // Required cases
        expect(getZipCodeErrorMessage("")).toBe(requiredMessage);
        expect(getZipCodeErrorMessage("  ")).toBe(requiredMessage);

        // Invalid cases
        expect(getZipCodeErrorMessage("invalid")).toBe(invalidMessage);
        expect(getZipCodeErrorMessage("12345a")).toBe(invalidMessage);
        expect(getZipCodeErrorMessage("1234")).toBe(invalidMessage);
      });

      it("has proper punctuation and capitalization", () => {
        expect(getZipCodeErrorMessage("")).toMatch(/^ZIP code is required$/);
        expect(getZipCodeErrorMessage("invalid")).toMatch(
          /^Please enter a valid US zip code\.$/
        );
      });
    });
  });

  describe("Function integration", () => {
    it("provides consistent validation between functions", () => {
      const testCases = [
        "12345", // Valid
        "12345-6789", // Valid
        "1234", // Invalid
        "12345a", // Invalid
        "", // Empty
        "   ", // Whitespace
      ];

      testCases.forEach(zipCode => {
        const isValid = isValidUSZipCode(zipCode);
        const errorMessage = getZipCodeErrorMessage(zipCode);

        if (isValid)
          // Valid ZIP codes should only be truly valid ones
          expect(zipCode.trim()).toMatch(/^\d{5}(-\d{4})?$/);
        else {
          // Invalid ZIP codes should have error messages
          expect(errorMessage).toBeTruthy();
          expect(errorMessage.length).toBeGreaterThan(0);
        }
      });
    });
  });
});
