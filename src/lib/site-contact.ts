/**
 * Canonical contact / office details (matches footer "Addresses" column).
 */
export const SITE_OFFICES = [
  {
    label: "Greece",
    address: "2 Charokopou str, Kallithea 17671 Athens, Greece",
  },
  {
    label: "India",
    address: "117/N/70 3rd Floor Kakadeo, Kanpur, Uttar Pradesh, India",
  },
] as const;

/** Google Maps embed search query (primary office for map preview). */
export const SITE_MAP_EMBED_QUERY = "2 Charokopou str Kallithea Athens Greece";
