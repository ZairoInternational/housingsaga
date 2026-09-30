"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";

let wishlistRequest: Promise<Set<string>> | null = null;

function loadWishlistIds() {
  if (!wishlistRequest) {
    wishlistRequest = fetch("/api/account/wishlist")
      .then(async (res) => {
        if (!res.ok) return new Set<string>();
        const json = (await res.json()) as { ids?: string[] };
        return new Set(json.ids ?? []);
      })
      .catch(() => new Set<string>());
  }
  return wishlistRequest;
}

export default function SaveHomeButton({
  propertyId,
  initiallySaved = false,
  className = "",
}: {
  propertyId: string;
  initiallySaved?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { status } = useSession();
  const [saved, setSaved] = useState(initiallySaved);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (initiallySaved || status !== "authenticated") return;
    let cancelled = false;
    void loadWishlistIds().then((ids) => {
      if (!cancelled) setSaved(ids.has(propertyId));
    });
    return () => {
      cancelled = true;
    };
  }, [initiallySaved, propertyId, status]);

  const onClick = async () => {
    if (status !== "authenticated") {
      router.push(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/account/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });
      if (!res.ok) return;
      const json = (await res.json()) as { saved?: boolean; ids?: string[] };
      setSaved(Boolean(json.saved));
      wishlistRequest = Promise.resolve(new Set(json.ids ?? []));
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={`z-40 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm hover:bg-white disabled:opacity-70 ${className}`}
    >
      <Heart
        size={20}
        className={saved ? "fill-lime-500 text-lime-600" : "text-gray-700"}
      />
    </button>
  );
}
