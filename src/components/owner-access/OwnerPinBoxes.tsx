import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  ownerPinInputActiveClass,
  ownerPinInputClass,
  ownerPinInputFilledClass,
} from "@/components/owner-access/ownerPinStyles";

export default function OwnerPinBoxes({
  digits,
  groupLabel,
  pending,
  invalid,
  lockDeviceKeyboard = false,
  blockWhenCompact = false,
  setInput,
  onChange,
  onKeyDown,
  onPaste,
  onActivate,
  listenForKeypad = true,
}: {
  digits: string[];
  groupLabel: string;
  pending: boolean;
  invalid?: boolean;
  /** When true, taps do not open the phone keyboard. A custom keypad owns entry. */
  lockDeviceKeyboard?: boolean;
  /** Checked at tap time, so the phone keyboard stays closed before React state updates. */
  blockWhenCompact?: boolean;
  setInput: (index: number, node: HTMLInputElement | null) => void;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (index: number, text: string) => void;
  onActivate?: (index: number) => void;
  /** Only the active PIN row should highlight when the on-screen keypad is used. */
  listenForKeypad?: boolean;
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const suppressBlur = useRef(false);
  const digitsRef = useRef(digits);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const digitsKey = digits.join("");
  digitsRef.current = digits;

  useEffect(() => {
    setFocusedIndex((current) => {
      if (current === null) return null;
      const currentDigits = digitsRef.current;
      const empty = currentDigits.findIndex((digit) => digit === "");
      return empty === -1 ? currentDigits.length - 1 : empty;
    });
  }, [digitsKey]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (groupRef.current?.contains(target)) return;
      if (target.closest("[data-owner-keypad]")) {
        if (!listenForKeypad) return;
        setFocusedIndex((current) => {
          if (current !== null) return current;
          const empty = digits.findIndex((digit) => digit === "");
          return empty === -1 ? digits.length - 1 : empty;
        });
        return;
      }
      setFocusedIndex(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [digits, listenForKeypad]);

  return (
    <div ref={groupRef} className="grid w-full min-w-0 grid-cols-4 gap-3" role="group" aria-label={groupLabel}>
      {digits.map((digit, index) => (
        <div key={`${groupLabel}-${index}`} className="relative min-w-0">
          <input
            ref={(node) => setInput(index, node)}
            value={digit}
            onChange={(event) => onChange(index, event.target.value)}
            onKeyDown={(event) => {
              if (shouldBlockNativeKeyboard(lockDeviceKeyboard, blockWhenCompact)) return;
              if (/^[0-9]$/.test(event.key)) {
                event.preventDefault();
                onChange(index, event.key);
                return;
              }
              onKeyDown(index, event);
            }}
            onPointerDown={(event) => {
              setFocusedIndex(index);
              onActivate?.(index);
              if (shouldBlockNativeKeyboard(lockDeviceKeyboard, blockWhenCompact)) {
                event.preventDefault();
              }
            }}
            onFocus={(event) => {
              setFocusedIndex(index);
              onActivate?.(index);
              if (shouldBlockNativeKeyboard(lockDeviceKeyboard, blockWhenCompact)) {
                suppressBlur.current = true;
                event.currentTarget.blur();
                return;
              }
              event.currentTarget.select();
            }}
            onBlur={(event) => {
              if (suppressBlur.current) {
                suppressBlur.current = false;
                return;
              }
              const next = event.relatedTarget;
              if (
                next instanceof Element &&
                (groupRef.current?.contains(next) || next.closest("[data-owner-keypad]"))
              ) {
                return;
              }
              setFocusedIndex((current) => (current === index ? null : current));
            }}
            onPaste={(event) => {
              event.preventDefault();
              onPaste(index, event.clipboardData.getData("text"));
            }}
            inputMode={lockDeviceKeyboard ? "none" : "numeric"}
            readOnly={lockDeviceKeyboard}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            pattern="[0-9]*"
            aria-label={`${groupLabel} digit ${index + 1} of ${digits.length}`}
            aria-invalid={invalid}
            maxLength={1}
            size={1}
            disabled={pending}
            className={`${ownerPinInputClass} ${digit ? ownerPinInputFilledClass : ""} ${
              index === focusedIndex ? ownerPinInputActiveClass : ""
            }`}
          />
          {digit ? (
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-[1.35rem] leading-none text-[#1c1917]"
              aria-hidden
            >
              •
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function shouldBlockNativeKeyboard(lockDeviceKeyboard: boolean, blockWhenCompact: boolean) {
  if (lockDeviceKeyboard) return true;
  return blockWhenCompact && window.matchMedia("(max-width: 767px)").matches;
}
