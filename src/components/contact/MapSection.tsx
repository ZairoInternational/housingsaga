"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { loadGoogleMapsScript } from "@/lib/google-maps";
import { SITE_OFFICES, type SiteOffice } from "@/lib/site-contact";

/**
 * Shows BOTH HousingSaga offices (Greece + India) as markers on one map.
 * fitBounds zooms out so both pins are visible.
 */
export default function MapSection() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [activeId, setActiveId] = useState<string>(SITE_OFFICES[0].id);

  useEffect(() => {
    let cancelled = false;
    let idleListener: google.maps.MapsEventListener | null = null;

    void (async () => {
      try {
        await loadGoogleMapsScript();
        if (cancelled || !mapDivRef.current) return;

        const map = new google.maps.Map(mapDivRef.current, {
          center: { lat: 30, lng: 50 },
          zoom: 3,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: "cooperative",
        });
        mapRef.current = map;

        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        const bounds = new google.maps.LatLngBounds();
        const info = new google.maps.InfoWindow();

        SITE_OFFICES.forEach((office) => {
          const position = { lat: office.lat, lng: office.lng };
          bounds.extend(position);

          const marker = new google.maps.Marker({
            map,
            position,
            title: `HousingSaga — ${office.label}`,
            label: {
              text: office.label[0],
              color: "#14532d",
              fontWeight: "700",
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: "#a3e635",
              fillOpacity: 1,
              strokeColor: "#14532d",
              strokeWeight: 2,
            },
          });

          marker.addListener("click", () => {
            setActiveId(office.id);
            info.setContent(
              `<div style="padding:4px 2px;font-family:system-ui,sans-serif">
                <strong style="color:#14532d">HousingSaga · ${office.label}</strong>
                <div style="margin-top:4px;font-size:12px;color:#444;max-width:220px">${office.address}</div>
              </div>`,
            );
            info.open({ map, anchor: marker });
          });

          markersRef.current.push(marker);
        });

        map.fitBounds(bounds, { top: 48, right: 48, bottom: 48, left: 48 });

        idleListener = google.maps.event.addListenerOnce(map, "idle", () => {
          const z = map.getZoom();
          // Keep a continent-scale view so both offices stay in frame
          if (typeof z === "number" && z > 4) map.setZoom(4);
        });

        setReady(true);
        setError(null);
      } catch {
        if (!cancelled) {
          setError("Map could not be loaded. Use Get Directions below.");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (idleListener) google.maps.event.removeListener(idleListener);
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
    };
  }, []);

  const focusOffice = (office: SiteOffice) => {
    setActiveId(office.id);
    const map = mapRef.current;
    if (!map) return;
    map.panTo({ lat: office.lat, lng: office.lng });
    map.setZoom(14);
  };

  return (
    <section className="bg-[#f6f7f4] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-start">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-700 mb-3">
              <span className="h-px w-5 bg-lime-600" />
              Find us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14532d] tracking-tight">
              Our Office Locations
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-md">
              HousingSaga operates from Greece and India. Both offices are pinned
              on the map — click a card to zoom in, or keep the wide view to see
              both.
            </p>

            <div className="mt-6 space-y-3">
              {SITE_OFFICES.map((office) => {
                const active = activeId === office.id;
                return (
                  <button
                    key={office.id}
                    type="button"
                    onClick={() => focusOffice(office)}
                    className={`w-full text-left rounded-2xl border px-4 py-4 transition ${
                      active
                        ? "border-lime-400 bg-white shadow-sm"
                        : "border-gray-200 bg-white/70 hover:border-lime-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-700">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#14532d]">
                          {office.label} Office
                        </p>
                        <p className="mt-1 text-[13px] text-gray-600 leading-snug">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {SITE_OFFICES.map((office) => (
                <a
                  key={office.id}
                  href={office.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-lime-500 bg-white hover:bg-lime-50 text-[#14532d] font-semibold text-sm px-5 py-2.5 transition"
                >
                  Directions · {office.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  const map = mapRef.current;
                  if (!map) return;
                  const bounds = new google.maps.LatLngBounds();
                  SITE_OFFICES.forEach((o) =>
                    bounds.extend({ lat: o.lat, lng: o.lng }),
                  );
                  map.fitBounds(bounds, 48);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-2.5 transition"
              >
                Show both on map
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px]">
              {error ? (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-500">
                  {error}
                </div>
              ) : (
                <>
                  {!ready && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 text-sm text-gray-400">
                      Loading map…
                    </div>
                  )}
                  <div ref={mapDivRef} className="h-full w-full" />
                </>
              )}
            </div>
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-lime-400 ring-1 ring-lime-700/40" />
                Greece · Athens
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-lime-400 ring-1 ring-lime-700/40" />
                India · Kanpur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
