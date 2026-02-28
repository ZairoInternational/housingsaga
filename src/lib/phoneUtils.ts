/**
 * Format phone number with common US format: (555) 123-4567
 * Works with various input formats
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return "";

  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, "");

  // Only format if we have digits
  if (!cleaned) return value;

  // Handle different lengths
  if (cleaned.length <= 3) {
    if (cleaned.length === 0) return "";
    if (cleaned.length === 1) return cleaned;
    if (cleaned.length === 2) return cleaned;
    return `(${cleaned})`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else {
    // Support international format with +1 prefix
    if (cleaned.startsWith("1")) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    }
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
}

/**
 * Validate phone number (at least 10 digits)
 */
export function validatePhoneNumber(value: string): boolean {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.length >= 10;
}

/**
 * Format phone number for storage/API (digits only)
 */
export function formatPhoneForStorage(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Format phone for display with country code prefix
 */
export function formatPhoneForDisplay(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length === 0) return "";

  if (cleaned.length >= 10) {
    const lastTen = cleaned.slice(-10);
    return `(${lastTen.slice(0, 3)}) ${lastTen.slice(3, 6)}-${lastTen.slice(6)}`;
  }

  return formatPhoneNumber(cleaned);
}
