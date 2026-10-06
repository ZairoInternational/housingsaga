"use client";

import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import OwnerKeypad, { COMPACT_PAD, usesCustomPad } from "@/components/owner-access/OwnerKeypad";
import OwnerPinBoxes from "@/components/owner-access/OwnerPinBoxes";
import OwnerLogo from "@/components/owner-access/OwnerLogo";
import OwnerPortalFrame from "@/components/owner-access/OwnerPortalFrame";
import { ownerPinErrorClass, ownerPrimaryButtonClass } from "@/components/owner-access/ownerPinStyles";

const PIN_LENGTH = 4;
const INCORRECT_PIN_TITLE = "Incorrect PIN";
const INCORRECT_PIN_MESSAGE = "The PIN you entered is incorrect. Please try again.";
const LOCKOUT_MESSAGE = "Too many incorrect attempts. Please try again later.";
type PinError = {
  title?: string;
  message: string;
};

export default function OwnerPinGate({ token }: { token: string }) {
  const router = useRouter();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [error, setError] = useState<PinError | null>(null);
  const [pending, setPending] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [customPad, setCustomPad] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(COMPACT_PAD);
    const sync = () => setCustomPad(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const pin = digits.join("");
  const complete = pin.length === PIN_LENGTH && digits.every((digit) => digit !== "");

  function focusIndex(index: number) {
    inputs.current[index]?.focus();
    inputs.current[index]?.select();
  }

  function writeDigits(next: string[], focusAt: number) {
    setDigits(next);
    setError(null);
    if (usesCustomPad()) {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      return;
    }
    window.requestAnimationFrame(() => focusIndex(focusAt));
  }

  function applyDigits(raw: string, startIndex: number) {
    const incoming = raw.replace(/\D/g, "").slice(0, PIN_LENGTH - startIndex);
    if (!incoming) return;
    const next = [...digits];
    for (let offset = 0; offset < incoming.length; offset += 1) {
      next[startIndex + offset] = incoming[offset] ?? "";
    }
    const focusAt = Math.min(startIndex + incoming.length, PIN_LENGTH - 1);
    writeDigits(next, focusAt);
  }

  function pushKey(key: string) {
    if (pending) return;
    if (key === "back") {
      let lastFilled = -1;
      for (let index = digits.length - 1; index >= 0; index -= 1) {
        if (digits[index]) {
          lastFilled = index;
          break;
        }
      }
      if (lastFilled < 0) return;
      const next = [...digits];
      next[lastFilled] = "";
      writeDigits(next, lastFilled);
      return;
    }
    const empty = digits.findIndex((digit) => digit === "");
    if (empty < 0) return;
    applyDigits(key, empty);
  }

  function onKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = "";
        writeDigits(next, index);
        return;
      }
      if (index > 0) {
        next[index - 1] = "";
        writeDigits(next, index - 1);
      }
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
    }
    if (event.key === "ArrowRight" && index < PIN_LENGTH - 1) {
      event.preventDefault();
      focusIndex(index + 1);
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!complete || pending) return;
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/owner-access/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, pin }),
      });
      const body = (await response.json().catch(() => null)) as {
        error?: string;
        title?: string;
        message?: string;
      } | null;

      if (!response.ok) {
        setDigits(Array(PIN_LENGTH).fill(""));
        window.requestAnimationFrame(() => focusIndex(0));
        if (body?.error === "locked") {
          setError({ message: body.message || LOCKOUT_MESSAGE });
        } else if (body?.error === "unavailable") {
          setError({ message: body.message || "Please try again in a moment." });
        } else {
          setError({
            title: body?.title || INCORRECT_PIN_TITLE,
            message: INCORRECT_PIN_MESSAGE,
          });
        }
        return;
      }

      router.refresh();
    } catch {
      setDigits(Array(PIN_LENGTH).fill(""));
      setError({ message: "Please try again in a moment." });
    } finally {
      setPending(false);
    }
  }

  return (
    <OwnerPortalFrame>
      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <OwnerLogo className="mx-auto" />
        <div className="mt-8 text-center">
          <p className="inline-flex items-center gap-2 text-base font-semibold text-[#1c1917]">
            <ShieldIcon />
            Owner Access
          </p>
          <p className="mt-2 text-sm text-[#66756c]">Enter your 4-digit PIN to continue</p>
        </div>

        <div className="mt-7">
          <OwnerPinBoxes
            digits={digits}
            groupLabel="Owner PIN"
            pending={pending}
            invalid={Boolean(error)}
            setInput={(index, node) => {
              inputs.current[index] = node;
            }}
            onChange={(index, value) => applyDigits(value, index)}
            onKeyDown={onKeyDown}
            onPaste={(index, text) => applyDigits(text, index)}
            lockDeviceKeyboard={customPad}
            blockWhenCompact
          />
        </div>

        {error && (
          <div className={`mt-4 flex gap-3 ${ownerPinErrorClass}`} role="alert">
            <AlertIcon />
            <div>
              {error.title && <p className="font-semibold">{error.title}</p>}
              <p className={error.title ? "mt-0.5" : ""}>{error.message}</p>
            </div>
          </div>
        )}

        <button type="submit" disabled={!complete || pending} className={`mt-5 ${ownerPrimaryButtonClass}`}>
          {pending ? "Checking…" : "Continue"}
        </button>

        <button
          type="button"
          onClick={() => setShowHint((open) => !open)}
          className="mt-4 text-center text-sm text-[#7b8a82]"
        >
          Forgot your PIN?
        </button>
        {showHint && (
          <p className="mt-2 text-center text-sm leading-6 text-[#66756c]">
            Use the PIN from your latest HousingSaga email, or request a new private link from your HousingSaga account.
          </p>
        )}

        <OwnerKeypad disabled={pending} onKey={pushKey} />
      </form>
    </OwnerPortalFrame>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#1F7A45]">
      <path
        d="M12 3.5 19 6.2v5.3c0 4.2-2.8 7.2-7 8.9-4.2-1.7-7-4.7-7-8.9V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 12.1 11 14l4-4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
    </svg>
  );
}
