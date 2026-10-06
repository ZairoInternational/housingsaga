"use client";

import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import OwnerKeypad, { COMPACT_PAD, usesCustomPad } from "@/components/owner-access/OwnerKeypad";
import OwnerLogo from "@/components/owner-access/OwnerLogo";
import OwnerPinBoxes from "@/components/owner-access/OwnerPinBoxes";
import OwnerPortalFrame from "@/components/owner-access/OwnerPortalFrame";
import { ownerPinErrorClass, ownerPrimaryButtonClass } from "@/components/owner-access/ownerPinStyles";

const PIN_LENGTH = 4;

function emptyPin() {
  return Array(PIN_LENGTH).fill("");
}

export default function OwnerSetPin() {
  const router = useRouter();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(emptyPin());
  const [confirmDigits, setConfirmDigits] = useState<string[]>(emptyPin());
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [customPad, setCustomPad] = useState(false);
  const [activeOffset, setActiveOffset] = useState(0);

  useEffect(() => {
    const query = window.matchMedia(COMPACT_PAD);
    const sync = () => setCustomPad(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const pin = digits.join("");
  const confirmPin = confirmDigits.join("");
  const complete =
    digits.every((digit) => digit !== "") && confirmDigits.every((digit) => digit !== "");

  function focusIndex(index: number) {
    inputs.current[index]?.focus();
    inputs.current[index]?.select();
  }

  function writeDigits(
    current: string[],
    setter: (next: string[]) => void,
    startIndex: number,
    raw: string,
    offset: number,
  ) {
    const incoming = raw.replace(/\D/g, "").slice(0, PIN_LENGTH - startIndex);
    if (!incoming) return;
    const next = [...current];
    for (let index = 0; index < incoming.length; index += 1) {
      next[startIndex + index] = incoming[index] ?? "";
    }
    setter(next);
    setError(null);
    if (usesCustomPad()) {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      return;
    }
    const focusAt = Math.min(offset + startIndex + incoming.length, offset + PIN_LENGTH - 1);
    window.requestAnimationFrame(() => focusIndex(focusAt));
  }

  function pushKey(key: string) {
    if (pending) return;
    const onNew = activeOffset === 0;
    const current = onNew ? digits : confirmDigits;
    const setter = onNew ? setDigits : setConfirmDigits;
    const offset = onNew ? 0 : PIN_LENGTH;

    if (key === "back") {
      let lastFilled = -1;
      for (let index = current.length - 1; index >= 0; index -= 1) {
        if (current[index]) {
          lastFilled = index;
          break;
        }
      }
      if (lastFilled < 0) {
        if (!onNew) setActiveOffset(0);
        return;
      }
      const next = [...current];
      next[lastFilled] = "";
      setter(next);
      setError(null);
      if (!usesCustomPad()) {
        window.requestAnimationFrame(() => focusIndex(offset + lastFilled));
      }
      return;
    }

    const empty = current.findIndex((digit) => digit === "");
    if (empty < 0) {
      if (onNew) setActiveOffset(PIN_LENGTH);
      return;
    }
    writeDigits(current, setter, empty, key, offset);
    if (onNew && empty === PIN_LENGTH - 1) setActiveOffset(PIN_LENGTH);
  }

  function onKeyDown(
    index: number,
    digitsNow: string[],
    setter: (next: string[]) => void,
    offset: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...digitsNow];
      if (next[index]) {
        next[index] = "";
        setter(next);
        focusIndex(offset + index);
        return;
      }
      if (index > 0) {
        next[index - 1] = "";
        setter(next);
        focusIndex(offset + index - 1);
      }
    }
  }

  async function leavePinSetup() {
    await fetch("/api/owner-access/sign-out", { method: "POST" });
    router.refresh();
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!complete || pending) return;
    if (pin !== confirmPin) {
      setConfirmDigits(emptyPin());
      setError("Those PINs do not match. Enter them again.");
      setActiveOffset(PIN_LENGTH);
      if (!usesCustomPad()) window.requestAnimationFrame(() => focusIndex(PIN_LENGTH));
      return;
    }

    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/owner-access/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const body = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;
      if (!response.ok) {
        setDigits(emptyPin());
        setConfirmDigits(emptyPin());
        setActiveOffset(0);
        if (!usesCustomPad()) window.requestAnimationFrame(() => focusIndex(0));
        setError(body?.message || "Please try again in a moment.");
        return;
      }
      router.refresh();
    } catch {
      setError("Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <OwnerPortalFrame>
      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="relative flex h-10 items-center justify-center">
          <button
            type="button"
            onClick={leavePinSetup}
            aria-label="Back"
            className="absolute left-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1c1917]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
              <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <OwnerLogo />
        </div>
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Choose a PIN</h1>
          <p className="mt-2 text-sm leading-6 text-[#66756c]">
            Create a 4-digit PIN to secure your account.
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-[#3f4b45]">New PIN</p>
          <OwnerPinBoxes
            digits={digits}
            groupLabel="New PIN"
            pending={pending}
            setInput={(index, node) => {
              inputs.current[index] = node;
            }}
            onChange={(index, value) => writeDigits(digits, setDigits, index, value, 0)}
            onKeyDown={(index, event) => onKeyDown(index, digits, setDigits, 0, event)}
            onPaste={(index, text) => writeDigits(digits, setDigits, index, text, 0)}
            onActivate={() => setActiveOffset(0)}
            lockDeviceKeyboard={customPad}
            blockWhenCompact
            listenForKeypad={activeOffset === 0}
          />
        </div>
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-[#3f4b45]">Confirm PIN</p>
          <OwnerPinBoxes
            digits={confirmDigits}
            groupLabel="Confirm PIN"
            pending={pending}
            invalid={Boolean(error)}
            setInput={(index, node) => {
              inputs.current[PIN_LENGTH + index] = node;
            }}
            onChange={(index, value) =>
              writeDigits(confirmDigits, setConfirmDigits, index, value, PIN_LENGTH)
            }
            onKeyDown={(index, event) =>
              onKeyDown(index, confirmDigits, setConfirmDigits, PIN_LENGTH, event)
            }
            onPaste={(index, text) =>
              writeDigits(confirmDigits, setConfirmDigits, index, text, PIN_LENGTH)
            }
            onActivate={() => setActiveOffset(PIN_LENGTH)}
            lockDeviceKeyboard={customPad}
            blockWhenCompact
            listenForKeypad={activeOffset === PIN_LENGTH}
          />
        </div>

        {error && (
          <p className={`mt-4 ${ownerPinErrorClass}`} role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={!complete || pending} className={`mt-6 ${ownerPrimaryButtonClass}`}>
          {pending ? "Saving…" : "Save PIN"}
        </button>
        <OwnerKeypad disabled={pending} onKey={pushKey} />
      </form>
    </OwnerPortalFrame>
  );
}
