/**
 * Canonical contact / office details (matches footer "Addresses" column).
 */
export const SITE_PHONE_DISPLAY = "+91 9076621166";
export const SITE_PHONE_TEL = "+919076621166";
export const SITE_EMAIL = "support@housingsaga.com";
export const SITE_WHATSAPP_URL = `https://wa.me/919076621166?text=${encodeURIComponent(
  "Hi HousingSaga, I’d like to chat with your team.",
)}`;

export type SiteOffice = {
  id: string;
  label: string;
  address: string;
  cityLine: string;
  lat: number;
  lng: number;
  directionsUrl: string;
};

export const SITE_OFFICES: SiteOffice[] = [
  {
    id: "greece",
    label: "Greece",
    address: "2 Charokopou str, Kallithea 17671 Athens, Greece",
    cityLine: "Athens, Greece",
    lat: 37.9558,
    lng: 23.7024,
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=2+Charokopou+str,+Kallithea+17671+Athens,+Greece",
  },
  {
    id: "india",
    label: "India",
    address: "117/N/70 3rd Floor Kakadeo, Kanpur, Uttar Pradesh, India",
    cityLine: "Kanpur, India",
    lat: 26.4794,
    lng: 80.3012,
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=117/N/70+3rd+Floor+Kakadeo,+Kanpur,+Uttar+Pradesh,+India",
  },
];

/** @deprecated Prefer SITE_OFFICES[0] — kept for older embeds */
export const SITE_MAP_EMBED_QUERY = SITE_OFFICES[0].address;
