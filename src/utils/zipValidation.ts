/**
 * Validates if a ZIP code is a valid US ZIP code format
 * @param zipCode - The ZIP code to validate
 * @returns boolean - true if valid, false otherwise
 */
export const isValidUSZipCode = (zipCode: string): boolean => {
  // Remove any whitespace
  const cleanedZipCode = zipCode.trim();

  // Check for 5-digit format
  const fiveDigitPattern = /^\d{5}$/;

  // Check for 6-digit format
  const sixDigitPattern = /^\d{6}$/;

  // Check for 5+4 format (e.g., 12345-6789)
  const nineDigitPattern = /^\d{5}-\d{4}$/;

  return (
    fiveDigitPattern.test(cleanedZipCode) ||
    sixDigitPattern.test(cleanedZipCode) ||
    nineDigitPattern.test(cleanedZipCode)
  );
};

/**
 * Gets the validation error message for an invalid ZIP code
 * @param zipCode - The ZIP code that failed validation
 * @returns string - Error message
 */
export const getZipCodeErrorMessage = (zipCode: string): string => {
  if (!zipCode || zipCode.trim().length === 0) return "ZIP code is required";

  return "Please enter a valid zip code.";
};
