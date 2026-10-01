"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  RiBuilding4Line,
  RiCheckboxCircleLine,
  RiCircleLine,
  RiEditLine,
  RiHotelBedLine,
  RiMapPin2Line,
  RiShowersLine,
  RiTimeLine,
  RiVipCrown2Line,
} from "react-icons/ri";
import { useRouter } from "next/navigation";

import { formatEurAmount } from "@/lib/format-currency";
import { isGoldenVisaEligible } from "@/lib/golden-visa-eligibility";

export interface OwnerListingCardItem {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  propertyType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image?: string;
  isActive: boolean;
  isVerified: boolean;
  isSold?: boolean;
  goldenVisaEligible?: boolean;
}

function formatPropertyType(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function OwnerListingCard({
  listing,
}: {
  listing: OwnerListingCardItem;
}) {
  const router = useRouter();
  const editHref = `/add-property?id=${listing.id}&edit=true`;
  const [sold, setSold] = useState(listing.isSold === true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSold(listing.isSold === true);
  }, [listing.isSold]);

  useEffect(() => {
    if (!confirmOpen) return;
    cancelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) setConfirmOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmOpen, pending]);

  async function markSold() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch(`/api/houses/${listing.id}/sold`, {
        method: "POST",
      });
      const body = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) {
        throw new Error(body?.error || "Could not mark this listing as sold.");
      }
      setSold(true);
      setConfirmOpen(false);
      router.refresh();
    } catch (markError) {
      setError(
        markError instanceof Error
          ? markError.message
          : "Could not mark this listing as sold.",
      );
    } finally {
      setPending(false);
    }
  }

  const goldenVisa = isGoldenVisaEligible(listing.goldenVisaEligible);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/8 bg-[#f7f6f3] dark:bg-[#13161f] shadow-sm">
      <div className="relative h-48 bg-gray-100 dark:bg-[#0d0f17] overflow-hidden">
        <Link href={editHref} className="absolute inset-0 block" aria-label={`Edit ${listing.name}`}>
          {listing.image ? (
            <Image
              src={listing.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 420px, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center">
              <RiBuilding4Line className="h-12 w-12 text-gray-200 dark:text-gray-700" />
            </span>
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </Link>

        <div className="absolute left-4 top-4 z-10 max-w-[calc(100%-7.5rem)] pointer-events-none">
          <span className="inline-block max-w-full truncate rounded-full bg-black/30 backdrop-blur-sm border border-white/15 px-3 py-1 text-xs font-medium text-white">
            {formatPropertyType(listing.propertyType)}
          </span>
        </div>

        <Link
          href={editHref}
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm hover:bg-white"
        >
          <RiEditLine className="h-3.5 w-3.5" />
          Edit
        </Link>

        {goldenVisa && (
          <span className="group/gv absolute bottom-3 left-3 z-20">
            <span
              tabIndex={0}
              className="inline-flex h-8 cursor-help items-center gap-1 rounded-full border border-amber-200 bg-amber-400 pl-1.5 pr-2.5 text-[11px] font-bold text-black shadow-md"
              aria-describedby={`gv-tip-${listing.id}`}
            >
              <RiVipCrown2Line className="h-3.5 w-3.5" aria-hidden />
              GV
            </span>
            <span
              id={`gv-tip-${listing.id}`}
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 hidden w-56 rounded-lg bg-gray-900 px-3 py-2 text-left text-[11px] font-medium normal-case leading-snug tracking-normal text-white shadow-lg group-hover/gv:block group-focus-within/gv:block"
            >
              GV means Golden Visa eligible. This property was marked as
              qualifying for a Golden Visa residency route.
            </span>
          </span>
        )}

        <div className="absolute bottom-3 right-3 z-10 flex gap-2 pointer-events-none">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm border ${
              sold
                ? "bg-gray-900/80 border-white/10 text-white"
                : listing.isActive
                  ? "bg-lime-500/20 border-lime-400/30 text-lime-300"
                  : "bg-black/20 border-white/10 text-gray-300"
            }`}
          >
            <RiCircleLine
              className={`h-2.5 w-2.5 ${
                sold ? "text-white" : listing.isActive ? "text-lime-400" : "text-gray-400"
              }`}
            />
            {sold ? "Sold" : listing.isActive ? "Active" : "Inactive"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm border ${
              listing.isVerified
                ? "bg-sky-500/20 border-sky-400/30 text-sky-300"
                : "bg-amber-500/20 border-amber-400/30 text-amber-300"
            }`}
          >
            {listing.isVerified ? (
              <RiCheckboxCircleLine className="h-3 w-3" />
            ) : (
              <RiTimeLine className="h-3 w-3" />
            )}
            {listing.isVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>

      <Link href={editHref} className="block p-5 pb-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {listing.name}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <RiMapPin2Line className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {listing.address}, {listing.city}, {listing.state}
              </span>
            </div>
          </div>
          <p className="shrink-0 text-lg font-bold text-gray-900 dark:text-white tabular-nums">
            {formatEurAmount(listing.price)}
          </p>
        </div>
      </Link>

      <div className="mt-4 mx-5 mb-5 flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/6">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <RiHotelBedLine className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {listing.bedrooms}
          </span>
          <span className="text-xs">beds</span>
        </div>
        <div className="h-3.5 w-px bg-gray-200 dark:bg-white/10" />
        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <RiShowersLine className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {listing.bathrooms}
          </span>
          <span className="text-xs">baths</span>
        </div>
        <div className="ml-auto">
          {sold ? (
            <span className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white cursor-disabled">
              Sold
            </span>
          ) : (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setConfirmOpen(true);
              }}
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/5 cursor-pointer"
            >
              Mark as sold
            </button>
          )}
        </div>
      </div>

      {confirmOpen && mounted
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4"
              role="presentation"
              onClick={() => {
                if (!pending) setConfirmOpen(false);
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#161922]"
                onClick={(event) => event.stopPropagation()}
              >
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  Mark this listing as sold?
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {listing.name} will be taken off the market. This cannot be
                  undone from here.
                </p>
                {error && (
                  <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
                    {error}
                  </p>
                )}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    ref={cancelRef}
                    type="button"
                    disabled={pending}
                    onClick={() => setConfirmOpen(false)}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60 dark:text-gray-200 dark:hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={markSold}
                    className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  >
                    {pending ? "Marking…" : "Yes, mark as sold"}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </article>
  );
}
