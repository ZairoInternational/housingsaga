let loadingPromise: Promise<void> | null = null;

function buildGoogleMapsScriptSrc(apiKey: string): string {
  const url = new URL("https://maps.googleapis.com/maps/api/js");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("libraries", "places");
  return url.toString();
}

export function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  const alreadyLoaded =
    typeof window.google !== "undefined" &&
    typeof window.google.maps !== "undefined" &&
    typeof window.google.maps.places !== "undefined";

  if (alreadyLoaded) return Promise.resolve();

  if (loadingPromise) return loadingPromise;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(
      new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.")
    );
  }

  loadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="true"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Google Maps script."))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = buildGoogleMapsScriptSrc(apiKey);
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script."));
    document.head.appendChild(script);
  });

  return loadingPromise;
}

