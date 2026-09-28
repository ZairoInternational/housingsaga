"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript } from "@/lib/google-maps";
import { APPROXIMATE_AREA_RADIUS_M } from "@/lib/map-privacy";

type Props = {
  latitude?: number;
  longitude?: number;
  /** Used only to geocode when lat/lng are missing */
  address?: string;
  className?: string;
};

/**
 * Deterministic ~150–250m offset so the circle center is never the exact spot.
 */
function approximateCenter(lat: number, lng: number): { lat: number; lng: number } {
  const seed =
    Math.abs(Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453) % 1;
  const angle = seed * Math.PI * 2;
  const distDeg = 0.0014 + seed * 0.001;
  const latRad = (lat * Math.PI) / 180;
  return {
    lat: lat + Math.cos(angle) * distDeg,
    lng: lng + (Math.sin(angle) * distDeg) / Math.cos(latRad),
  };
}

/**
 * Shows a privacy radius circle with a house icon at the approximate center
 * (not an exact address pin).
 */
export default function ApproximateAreaMap({
  latitude,
  longitude,
  address,
  className = "",
}: Props) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await loadGoogleMapsScript();
        if (cancelled || !mapDivRef.current) return;

        let lat = latitude;
        let lng = longitude;

        if (
          (typeof lat !== "number" ||
            !Number.isFinite(lat) ||
            typeof lng !== "number" ||
            !Number.isFinite(lng)) &&
          address
        ) {
          const geocoder = new google.maps.Geocoder();
          const result = await geocoder.geocode({ address });
          const loc = result.results[0]?.geometry?.location;
          if (!loc) {
            setError("Map preview is not available for this property.");
            return;
          }
          lat = loc.lat();
          lng = loc.lng();
        }

        if (
          typeof lat !== "number" ||
          !Number.isFinite(lat) ||
          typeof lng !== "number" ||
          !Number.isFinite(lng)
        ) {
          setError("Map preview is not available for this property.");
          return;
        }

        const center = approximateCenter(lat, lng);

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(mapDivRef.current, {
            center,
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            gestureHandling: "cooperative",
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });
        } else {
          mapRef.current.setCenter(center);
        }

        if (circleRef.current) {
          circleRef.current.setMap(null);
        }
        circleRef.current = new google.maps.Circle({
          map: mapRef.current,
          center,
          radius: APPROXIMATE_AREA_RADIUS_M,
          strokeColor: "#65a30d",
          strokeOpacity: 0.95,
          strokeWeight: 2.5,
          fillColor: "#84cc16",
          fillOpacity: 0.22,
          clickable: false,
        });

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        markerRef.current = new google.maps.Marker({
          map: mapRef.current,
          position: center,
          title: "Approximate area",
          clickable: false,
          optimized: false,
          icon: {
            url: "/map-house-icon.png",
            scaledSize: new google.maps.Size(64, 64),
            anchor: new google.maps.Point(32, 32),
          },
          zIndex: 10,
        });

        const bounds = circleRef.current.getBounds();
        if (bounds) {
          mapRef.current.fitBounds(bounds, 48);
        }

        setReady(true);
        setError(null);
      } catch {
        if (!cancelled) {
          setError("Map preview is not available for this property.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, address]);

  if (error) {
    return (
      <div
        className={`flex h-full items-center justify-center bg-gray-50 text-sm text-gray-400 ${className}`}
      >
        {error}
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 text-sm text-gray-400">
          Loading map…
        </div>
      )}
      <div ref={mapDivRef} className="h-full w-full" />
    </div>
  );
}
