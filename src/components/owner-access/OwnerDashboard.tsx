"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import OwnerDecor from "@/components/owner-access/OwnerDecor";
import OwnerLogo from "@/components/owner-access/OwnerLogo";
import { ownerOutlineButtonClass, ownerPrimaryButtonClass } from "@/components/owner-access/ownerPinStyles";
import { formatEurAmount } from "@/lib/format-currency";
import type { OwnerPortalProperty } from "@/lib/owner-access-policy";
import { formatDashCaseLabel } from "@/lib/property-display";

function propertyTypeLabel(value: string) {
  if (!value) return "Property";
  if (value.toLowerCase() === "rk") return "RK";
  return formatDashCaseLabel(value);
}

function PropertyPhoto({ property }: { property: OwnerPortalProperty }) {
  if (!property.image) {
    return <div className="h-full w-full bg-[#e7f3ec]" />;
  }
  return <img src={property.image} alt="" className="h-full w-full object-cover" />;
}

export default function OwnerDashboard({
  initialProperties,
}: {
  initialProperties: OwnerPortalProperty[];
}) {
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);
  const [selected, setSelected] = useState<OwnerPortalProperty | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [soldName, setSoldName] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const stayRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const signOutTitleId = useId();
  const successTitleId = useId();

  useEffect(() => {
    setProperties(initialProperties);
  }, [initialProperties]);

  useEffect(() => {
    const dialogOpen = Boolean(selected) || confirmSignOut || Boolean(soldName);
    if (!dialogOpen) return;
    const focusTarget = soldName ? doneRef : confirmSignOut ? stayRef : cancelRef;
    focusTarget.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || pendingId || signingOut) return;
      setSelected(null);
      setConfirmSignOut(false);
      setSoldName(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, confirmSignOut, soldName, pendingId, signingOut]);

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/owner-access/sign-out", { method: "POST" });
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  async function confirmSold() {
    if (!selected || pendingId) return;
    const name = selected.name;
    setPendingId(selected.id);
    setActionError(null);
    try {
      const response = await fetch(
        `/api/owner-access/properties/${encodeURIComponent(selected.id)}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "sold" }),
        },
      );
      const body = (await response.json().catch(() => null)) as {
        property?: OwnerPortalProperty;
        error?: string;
      } | null;
      if (response.status === 401) {
        setSelected(null);
        router.refresh();
        return;
      }
      if (!response.ok || !body?.property) {
        throw new Error("We couldn't update this property. Please try again.");
      }
      setProperties((current) =>
        current.map((property) =>
          property.id === body.property!.id ? body.property! : property,
        ),
      );
      setSelected(null);
      setSoldName(body.property.name || name);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "We couldn't update this property. Please try again.",
      );
    } finally {
      setPendingId(null);
    }
  }

  const countLabel =
    properties.length === 1 ? "1 property" : `${properties.length} properties`;

  return (
    <div className="min-h-dvh bg-[#f6fbf8] text-[#1c1917]">
      <header className="sticky top-0 z-20 border-b border-[#e5efe9] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <OwnerLogo />
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-[#d7e7dc] bg-white px-3 py-1.5 text-sm font-medium sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-[#1F7A45]" aria-hidden />
              Owner
            </span>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setSoldName(null);
                setConfirmSignOut(true);
              }}
              disabled={signingOut}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d7e7dc] bg-white px-3 text-sm font-medium transition hover:bg-[#f4fbf7] disabled:opacity-60"
            >
              <LogoutIcon />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        {properties.length === 0 ? (
          <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
            <OwnerDecor />
            <div className="relative">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#e5f6ec] text-[#1F7A45]">
                <HouseIcon />
              </div>
              <h1 className="mt-6 text-2xl font-semibold tracking-tight">No properties found</h1>
              <p className="mt-2 text-sm text-[#66756c]">You don&apos;t have any properties listed yet.</p>
              <p className="mt-3 text-sm text-[#66756c]">
                Contact{" "}
                <Link href="/contact" className="font-semibold text-[#1F7A45]">
                  HousingSaga
                </Link>{" "}
                for assistance.
              </p>
              <Link
                href="/contact"
                rel="noreferrer"
                className={`mx-auto mt-6 max-w-xs ${ownerPrimaryButtonClass}`}
              >
                Contact HousingSaga
              </Link>
            </div>
          </section>
        ) : (
          <>
            <section className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Your Properties</h1>
                <p className="mt-1 text-sm text-[#66756c]">Manage your listed properties</p>
              </div>
              <p className="text-sm text-[#66756c]">{countLabel}</p>
            </section>

            <section className="mt-6 space-y-4">
              {properties.map((property) => {
                const sold = property.status === "sold";
                return (
                  <article
                    key={property.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[#e5efe9] bg-white p-3 shadow-[0_8px_24px_rgba(28,25,23,0.04)] sm:flex-row sm:items-center sm:p-4"
                  >
                    <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl bg-[#e7f3ec] sm:h-28 sm:w-40">
                      <PropertyPhoto property={property} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          sold ? "bg-[#eef1ef] text-[#66756c]" : "bg-[#e5f6ec] text-[#1F7A45]"
                        }`}
                      >
                        {sold ? "Sold" : "Available"}
                      </span>
                      <h2 className="mt-2 text-lg font-semibold tracking-tight">{property.name}</h2>
                      {property.location && (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#66756c]">
                          <PinIcon />
                          <span className="truncate">{property.location}</span>
                        </p>
                      )}
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-[#66756c]">
                        <SmallHouseIcon />
                        {propertyTypeLabel(property.propertyType)}
                      </p>
                      {property.price != null && (
                        <p className="mt-2 text-sm font-semibold">{formatEurAmount(property.price)}</p>
                      )}
                    </div>
                    {!sold && (
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmSignOut(false);
                          setSoldName(null);
                          setActionError(null);
                          setSelected(property);
                        }}
                        className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-lg border border-[#1F7A45] px-4 text-sm font-semibold text-[#1F7A45] transition hover:bg-[#f3faf6] sm:w-auto sm:self-center"
                      >
                        Mark as Sold
                      </button>
                    )}
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#1c2b24]/45 sm:items-center sm:p-4"
          role="presentation"
          onClick={() => {
            if (!pendingId) setSelected(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-t-3xl bg-white px-5 pb-6 pt-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:rounded-3xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f6ec] text-[#1F7A45]">
              <SmallHouseIcon />
            </div>
            <h2 id={titleId} className="mt-4 text-center text-xl font-semibold tracking-tight">
              Mark property as sold?
            </h2>
            <p className="mt-3 text-center font-semibold">{selected.name}</p>
            <p className="mt-1 text-center text-sm text-[#66756c]">
              {[selected.location, propertyTypeLabel(selected.propertyType)].filter(Boolean).join(" · ")}
            </p>
            <p className="mt-3 text-center text-sm leading-6 text-[#66756c]">
              Once marked as sold, this property will no longer appear as available.
            </p>
            {actionError && (
              <p className="mt-3 text-center text-sm text-[#9f1239]" role="alert">
                {actionError}
              </p>
            )}
            <button
              type="button"
              disabled={Boolean(pendingId)}
              onClick={confirmSold}
              className={`mt-5 ${ownerPrimaryButtonClass}`}
            >
              {pendingId ? "Confirming…" : "Confirm Sold"}
            </button>
            <button
              ref={cancelRef}
              type="button"
              disabled={Boolean(pendingId)}
              onClick={() => setSelected(null)}
              className={`mt-3 ${ownerOutlineButtonClass}`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {soldName && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#1c2b24]/45 sm:items-center sm:p-4"
          role="presentation"
          onClick={() => setSoldName(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={successTitleId}
            className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white px-5 pb-6 pt-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:rounded-3xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="absolute left-10 top-8 h-2 w-4 rotate-[-30deg] rounded-full bg-[#8dcea8]" aria-hidden />
            <span className="absolute right-12 top-6 h-2 w-5 rotate-45 rounded-full bg-[#1F7A45]" aria-hidden />
            <span className="absolute right-8 top-16 h-1.5 w-3 rotate-12 rounded-full bg-[#b7dfc8]" aria-hidden />
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1F7A45] text-white">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="m6 12.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id={successTitleId} className="mt-4 text-center text-xl font-semibold tracking-tight">
              Property Marked as Sold!
            </h2>
            <p className="mt-2 text-center text-sm leading-6 text-[#66756c]">
              {soldName} has been successfully marked as sold.
            </p>
            <button
              ref={doneRef}
              type="button"
              onClick={() => setSoldName(null)}
              className={`mt-6 ${ownerPrimaryButtonClass}`}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {confirmSignOut && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c2b24]/55 p-4"
          role="presentation"
          onClick={() => {
            if (!signingOut) setConfirmSignOut(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={signOutTitleId}
            className="w-full max-w-sm rounded-3xl bg-white px-6 py-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f6ec] text-[#1F7A45]">
              <LogoutIcon />
            </div>
            <h2 id={signOutTitleId} className="mt-4 text-xl font-semibold tracking-tight">
              Sign out?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#66756c]">
              Are you sure you want to sign out of your account?
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                ref={stayRef}
                type="button"
                disabled={signingOut}
                onClick={() => setConfirmSignOut(false)}
                className={ownerOutlineButtonClass}
              >
                Stay signed in
              </button>
              <button
                type="button"
                disabled={signingOut}
                onClick={signOut}
                className={ownerPrimaryButtonClass}
              >
                {signingOut ? "Signing out…" : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#1F7A45]">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function SmallHouseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#1F7A45]">
      <path d="m4 11 8-7 8 7v8a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 7V5a1 1 0 0 1 1-1h7v16h-7a1 1 0 0 1-1-1v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 12h10M11 8l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
