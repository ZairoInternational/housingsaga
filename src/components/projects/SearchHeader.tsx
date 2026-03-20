"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { loadGoogleMapsScript } from "@/lib/google-maps";

export type ProjectsSearchFilters = {
  locationQuery?: string;
  roomsMin?: number;
  bathroomsMin?: number;
};

const ROOM_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: "Rooms", value: null },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const BATHROOM_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: "Bathrooms", value: null },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

type SelectedPlace = {
  placeId?: string;
  query?: string;
  display?: string;
};

function pickFirstComponent(
  addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
  preferredTypes: string[],
): string | undefined {
  if (!addressComponents || addressComponents.length === 0) return undefined;

  for (const preferredType of preferredTypes) {
    const match = addressComponents.find((c) => c.types.includes(preferredType));
    if (match?.long_name) return match.long_name;
  }

  return undefined;
}

function buildLocationQuery(place: google.maps.places.PlaceResult): string | undefined {
  const components = place.address_components;

  const city =
    pickFirstComponent(components, [
      "locality",
      "postal_town",
      "administrative_area_level_2",
      "administrative_area_level_1",
    ]) ?? undefined;

  const country = pickFirstComponent(components, ["country"]) ?? undefined;

  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;

  if (typeof place.formatted_address === "string" && place.formatted_address.trim().length) {
    return place.formatted_address.trim();
  }

  if (typeof place.name === "string" && place.name.trim().length) {
    return place.name.trim();
  }

  return undefined;
}

export default function SearchHeader({
  onSearch,
  initialValue,
}: {
  onSearch: (filters: ProjectsSearchFilters) => void;
  initialValue?: ProjectsSearchFilters;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [locationText, setLocationText] = useState<string>(initialValue?.locationQuery ?? "");
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace>({
    placeId: undefined,
    query: initialValue?.locationQuery,
    display: initialValue?.locationQuery,
  });

  const [roomsMin, setRoomsMin] = useState<number | undefined>(initialValue?.roomsMin);
  const [bathroomsMin, setBathroomsMin] = useState<number | undefined>(initialValue?.bathroomsMin);

  const roomsSelectValue = useMemo(() => String(roomsMin ?? 0), [roomsMin]);
  const bathroomsSelectValue = useMemo(
    () => String(bathroomsMin ?? 0),
    [bathroomsMin],
  );

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await loadGoogleMapsScript();
        if (cancelled) return;

        if (!inputRef.current) return;

        if (!autocompleteRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            {
              types: ["(cities)"],
              fields: ["address_components", "formatted_address", "name", "place_id"],
            },
          );
        }

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place) return;

          const query = buildLocationQuery(place);
          const display = place.formatted_address ?? place.name ?? query ?? "";

          setSelectedPlace({
            placeId: place.place_id,
            query,
            display,
          });
          setLocationText(display);
        });
      } catch {
        // If Google Maps fails to load, inputs still work for manual entry.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLocationChange = (next: string) => {
    setLocationText(next);
    // If the user types, treat it as "not selected" until they pick a suggestion.
    setSelectedPlace((prev) => ({ ...prev, query: undefined, display: next }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextFilters: ProjectsSearchFilters = {
      ...(selectedPlace.query?.trim() ? { locationQuery: selectedPlace.query.trim() } : {}),
      ...(typeof roomsMin === "number" ? { roomsMin } : {}),
      ...(typeof bathroomsMin === "number" ? { bathroomsMin } : {}),
    };

    onSearch(nextFilters);
  };

  return (
    <section className="w-full py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={onSubmit}
          className="
            rounded-2xl bg-white/90 dark:bg-white/5
            border border-gray-200 dark:border-white/10
            shadow-[0_20px_50px_rgba(0,0,0,0.06)]
            backdrop-blur
            px-4 sm:px-6 py-5
          "
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-4">
            {/* Location */}
            <div className="flex-1">
              <label htmlFor="projects-location" className="sr-only">
                Location
              </label>
              <input
                id="projects-location"
                ref={inputRef}
                value={locationText}
                onChange={(e) => handleLocationChange(e.target.value)}
                type="text"
                placeholder="Location (city or country)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141827] text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500/40 transition"
                aria-label="Location"
              />
            </div>

            {/* Rooms */}
            <div className="w-full sm:w-40">
              <label htmlFor="projects-rooms" className="sr-only">
                Rooms
              </label>
              <select
                id="projects-rooms"
                value={roomsSelectValue}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isFinite(n) || n === 0) setRoomsMin(undefined);
                  else setRoomsMin(n);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141827] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500/40 transition"
                aria-label="Rooms"
              >
                {ROOM_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.value ?? 0}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bathrooms */}
            <div className="w-full sm:w-40">
              <label htmlFor="projects-bathrooms" className="sr-only">
                Bathrooms
              </label>
              <select
                id="projects-bathrooms"
                value={bathroomsSelectValue}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isFinite(n) || n === 0) setBathroomsMin(undefined);
                  else setBathroomsMin(n);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141827] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500/40 transition"
                aria-label="Bathrooms"
              >
                {BATHROOM_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.value ?? 0}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="lg:w-44">
              <button
                type="submit"
                className="
                  w-full inline-flex items-center justify-center gap-2
                  rounded-xl bg-lime-400 hover:bg-lime-300 active:bg-lime-300
                  text-gray-900 font-semibold
                  px-4 py-3
                  shadow-[0_10px_30px_rgba(132,204,22,0.25)]
                  transition
                "
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

