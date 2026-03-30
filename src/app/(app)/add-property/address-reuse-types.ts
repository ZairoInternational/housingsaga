export type ExistingAddressOption = {
  /**
   * Unique per address option (use House _id for keying).
   * Radio options will be deduplicated server-side by `addressKey`.
   */
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  latitude: string;
  longitude: string;
  addressKey: string;
};

