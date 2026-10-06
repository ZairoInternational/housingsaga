export default function OwnerDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-20 -top-16 h-56 w-56 rounded-full bg-[#d9f3e4]" />
      <div className="absolute -right-16 top-10 h-44 w-44 rounded-full bg-[#e7f7ee]" />
      <svg className="absolute -left-6 top-24 h-16 w-16 text-[#b7dfc8]" viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 6c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18z" />
      </svg>
      <svg className="absolute right-4 top-40 h-12 w-12 text-[#c6e8d4]" viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 6c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18z" />
      </svg>
      <svg className="absolute bottom-0 left-1/2 h-44 w-[150%] -translate-x-1/2 text-[#e5f6ec]" viewBox="0 0 400 160" fill="currentColor">
        <path d="M0 90c40-30 80-30 120 0s80 30 120 0 80-30 120 0 40 20 40 20v50H0V90z" />
        <path d="M0 120c50-24 90-20 140 4s90 20 140-6 80-16 120 8v34H0v-40z" opacity="0.85" />
      </svg>
      <svg className="absolute bottom-8 left-1/2 h-24 w-36 -translate-x-1/2 text-[#cfe8da]" viewBox="0 0 160 100" fill="none">
        <path d="M20 78V48L80 18l60 30v30" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        <path d="M68 78V56h24v22" stroke="currentColor" strokeWidth="6" />
        <circle cx="28" cy="40" r="10" fill="#d9f3e4" />
        <circle cx="132" cy="36" r="14" fill="#d9f3e4" />
      </svg>
    </div>
  );
}
