import OwnerLogo from "@/components/owner-access/OwnerLogo";
import OwnerPortalFrame from "@/components/owner-access/OwnerPortalFrame";
import { ownerPrimaryButtonClass } from "@/components/owner-access/ownerPinStyles";

export default function OwnerLinkExpired() {
  return (
    <OwnerPortalFrame>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <OwnerLogo />
        <div className="mt-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#e5f6ec] text-[#1F7A45]">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M10 13a5 5 0 0 0 7.1.1l1.4-1.4a5 5 0 0 0-7.1-7.1L10 6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M14 11a5 5 0 0 0-7.1-.1L5.5 12.3a5 5 0 0 0 7.1 7.1L14 18"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path d="m8 8 8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Link Expired</h1>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[#66756c]">
          This link is no longer valid. Please check your latest email for a new access link.
        </p>
        <a href="mailto:" className={`mt-8 ${ownerPrimaryButtonClass}`}>
          Back to Email
        </a>
      </div>
    </OwnerPortalFrame>
  );
}
