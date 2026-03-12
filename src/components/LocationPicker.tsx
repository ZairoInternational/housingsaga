"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadGoogleMapsScript } from "@/lib/google-maps";

export type LocationValue = {
  latitude?: string;
  longitude?: string;
  address?: string;
};

type Props = {
  value: LocationValue;
  onChange: (next: Required<Pick<LocationValue, "latitude" | "longitude">> & Partial<Pick<LocationValue, "address">>) => void;
  className?: string;
  placeholder?: string;
  showConfirmIndicator?: boolean;
};

const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 }; // India (neutral default)
const DEFAULT_ZOOM = 4;
const PICKED_ZOOM = 16;

function parseNumber(value: string | undefined): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toCoordString(n: number): string {
  return n.toFixed(6);
}

export default function LocationPicker({
  value,
  onChange,
  className,
  placeholder = "Search for a location…",
  showConfirmIndicator = true,
}: Props) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]);

  const [isReady, setIsReady] = useState(false);
  const [displayAddress, setDisplayAddress] = useState<string | null>(null);
  const [hasPicked, setHasPicked] = useState(false);

  const initialCenter = useMemo(() => {
    const lat = parseNumber(value.latitude);
    const lng = parseNumber(value.longitude);
    if (lat !== null && lng !== null) return { lat, lng };
    return DEFAULT_CENTER;
  }, [value.latitude, value.longitude]);

  const initialZoom = useMemo(() => {
    const lat = parseNumber(value.latitude);
    const lng = parseNumber(value.longitude);
    return lat !== null && lng !== null ? PICKED_ZOOM : DEFAULT_ZOOM;
  }, [value.latitude, value.longitude]);

  const setMarkerTo = useCallback(
    (latLng: google.maps.LatLng, nextAddress?: string) => {
      const map = mapRef.current;
      const marker = markerRef.current;
      if (!map || !marker) return;

      marker.setPosition(latLng);
      map.panTo(latLng);

      const lat = latLng.lat();
      const lng = latLng.lng();
      onChange({
        latitude: toCoordString(lat),
        longitude: toCoordString(lng),
        ...(nextAddress ? { address: nextAddress } : {}),
      });
      setHasPicked(true);
      if (typeof nextAddress === "string") setDisplayAddress(nextAddress);
    },
    [onChange]
  );

  const reverseGeocode = useCallback(
    async (latLng: google.maps.LatLng) => {
      if (!geocoderRef.current) return;
      try {
        const res = await geocoderRef.current.geocode({ location: latLng });
        const formatted = res.results?.[0]?.formatted_address;
        if (formatted) {
          setDisplayAddress(formatted);
          onChange({
            latitude: toCoordString(latLng.lat()),
            longitude: toCoordString(latLng.lng()),
            address: formatted,
          });
        }
      } catch {
        // ignore geocoder failures; coordinates still update
      }
    },
    [onChange]
  );

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await loadGoogleMapsScript();
      if (cancelled) return;

      const mapDiv = mapDivRef.current;
      if (!mapDiv) return;

      if (!mapRef.current) {
        mapRef.current = new google.maps.Map(mapDiv, {
          center: initialCenter,
          zoom: initialZoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        });
      }

      if (!markerRef.current) {
        markerRef.current = new google.maps.Marker({
          map: mapRef.current,
          position: initialCenter,
          draggable: true,
        });
      }

      if (!geocoderRef.current) {
        geocoderRef.current = new google.maps.Geocoder();
      }

      if (inputRef.current && !autocompleteRef.current) {
        autocompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            fields: ["geometry", "formatted_address", "name"],
          }
        );
      }

      // Clean any existing listeners before attaching
      listenersRef.current.forEach((l) => l.remove());
      listenersRef.current = [];

      if (autocompleteRef.current) {
        listenersRef.current.push(
          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace();
            const loc = place?.geometry?.location;
            if (!loc) return;
            mapRef.current?.setZoom(PICKED_ZOOM);
            setMarkerTo(loc, place?.formatted_address ?? place?.name);
          })
        );
      }

      if (mapRef.current) {
        listenersRef.current.push(
          mapRef.current.addListener("click", (e: google.maps.MapMouseEvent) => {
            if (!e.latLng) return;
            setMarkerTo(e.latLng);
            void reverseGeocode(e.latLng);
          })
        );
      }

      if (markerRef.current) {
        listenersRef.current.push(
          markerRef.current.addListener("dragend", () => {
            const pos = markerRef.current?.getPosition();
            if (!pos) return;
            setMarkerTo(pos);
            void reverseGeocode(pos);
          })
        );
      }

      setDisplayAddress(value.address?.trim() ? value.address : null);
      setIsReady(true);
    })().catch(() => {
      // handled by UI below
      setIsReady(false);
    });

    return () => {
      cancelled = true;
      listenersRef.current.forEach((l) => l.remove());
      listenersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCenter.lat, initialCenter.lng, initialZoom, reverseGeocode, setMarkerTo]);

  // Keep map in sync when form values change externally (e.g. manual lat/lng edits)
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    const lat = parseNumber(value.latitude);
    const lng = parseNumber(value.longitude);
    if (lat === null || lng === null) return;

    const pos = new google.maps.LatLng(lat, lng);
    marker.setPosition(pos);
    map.panTo(pos);
  }, [value.latitude, value.longitude]);

  const latText = value.latitude?.trim() ? value.latitude : "—";
  const lngText = value.longitude?.trim() ? value.longitude : "—";

  const showAddress = (displayAddress ?? "").trim().length > 0;
  const confirmText = showConfirmIndicator && hasPicked ? "Location selected" : null;

  return (
    <div className={className}>
      <div className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141827] text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition"
            aria-label="Search location"
          />
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#141827]">
          <div ref={mapDivRef} className="h-64 w-full" />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400">
          {confirmText ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {confirmText}
            </span>
          ) : (
            <span className="text-gray-400 dark:text-gray-500">
              Search, click the map, or drag the pin.
            </span>
          )}
          <span className="font-mono">
            Lat: {latText} • Lng: {lngText}
          </span>
        </div>

        {showAddress && (
          <div className="text-xs text-gray-600 dark:text-gray-300">
            <span className="text-gray-400 dark:text-gray-500">Selected address:</span>{" "}
            {displayAddress}
          </div>
        )}

        {!isReady && (
          <div className="text-xs text-amber-600 dark:text-amber-400">
            Map is loading… If it doesn&apos;t appear, check your Google Maps API key
            and that the Places API is enabled.
          </div>
        )}
      </div>
    </div>
  );
}

