const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"] as const;

export const COMPACT_PAD = "(max-width: 767px)";

export function usesCustomPad() {
  return window.matchMedia(COMPACT_PAD).matches;
}

export default function OwnerKeypad({
  disabled,
  onKey,
}: {
  disabled: boolean;
  onKey: (key: string) => void;
}) {
  return (
    <div data-owner-keypad="" className="mt-auto grid grid-cols-3 gap-3 pt-8">
      {KEYS.map((key) =>
        key === "" ? (
          <span key="spacer" />
        ) : (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onKey(key)}
            className="flex h-14 items-center justify-center rounded-2xl bg-white text-xl font-medium text-[#1c1917] shadow-[0_1px_2px_rgba(28,25,23,0.06)] transition active:bg-[#e7f6ee] disabled:opacity-60"
            aria-label={key === "back" ? "Delete" : key}
          >
            {key === "back" ? <BackspaceIcon /> : key}
          </button>
        ),
      )}
    </div>
  );
}

function BackspaceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-6-6 6-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="m13 10 4 4M17 10l-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
