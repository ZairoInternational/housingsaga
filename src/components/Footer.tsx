"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import {
  SITE_EMAIL,
  SITE_OFFICES,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site-contact";

const QUICK_LINKS = [
  { label: "Overview", href: "/overview" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Team", href: "/our-team" },
  { label: "Golden Visa", href: "/golden-visa" },
  { label: "Media Kit", href: "/media-kit" },
];

const RESOURCE_LINKS = [
  { label: "Blog", href: "/blogs" },
  { label: "Help Center", href: "/help-center" },
  { label: "FAQ", href: "/faq" },
  { label: "Services", href: "/services" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: Youtube,
  },
  {
    label: "X",
    href: "https://x.com/",
    Icon: XIcon,
  },
] as const;

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.258 5.686L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-lime-400">
        {title}
      </h3>
      <div className="mt-2.5 mb-5 h-px w-10 bg-lime-400/90" />
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-[14px] text-white/85 hover:text-lime-300 transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialRow({
  variant = "circle",
}: {
  variant?: "circle" | "plain";
}) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={
            variant === "circle"
              ? "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-lime-400 hover:text-black transition"
              : "inline-flex h-8 w-8 items-center justify-center text-white/80 hover:text-lime-300 transition"
          }
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

const OFFICE_CARDS = [
  {
    office: SITE_OFFICES[0],
    flag: "/greece.png",
    flagAlt: "Greece",
    label: "Greece Office",
    thumb: "/office-greece-thumb.jpg",
    thumbAlt: "Parthenon, Athens",
  },
  {
    office: SITE_OFFICES[1],
    flag: "/india.png",
    flagAlt: "India",
    label: "India Office",
    thumb: "/office-india-thumb.jpg",
    thumbAlt: "India Gate, New Delhi",
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative w-full text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/footer-villa-bg.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#050a0f]/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a0f]/95 via-[#050a0f]/55 to-[#050a0f]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a0f]/70 via-transparent to-[#050a0f]/45" />
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[18%] sm:bottom-[14%] flex justify-center select-none"
      >
        <span className="text-[clamp(3rem,14vw,10rem)] font-bold tracking-[0.08em] uppercase text-white/[0.05] whitespace-nowrap leading-none">
          Housing Saga
        </span>
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10">
        {/* Brand + link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/housinglogo.png"
                alt="HousingSaga"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold tracking-[0.1em] uppercase">
                Housing Saga
              </span>
            </Link>
            <p className="mt-4 text-sm font-medium text-white">
              Your dream home. Our priority.
            </p>
            <p className="mt-3 text-[13px] text-white/65 leading-relaxed max-w-[320px]">
              Discover, explore and book the best properties around the world
              with HousingSaga.
            </p>
            <Link
              href="/projects"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold px-5 py-2.5 transition"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-5">
              <SocialRow variant="circle" />
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 lg:pl-6">
            <LinkColumn title="Quick Links" links={QUICK_LINKS} />
            <LinkColumn title="Company" links={COMPANY_LINKS} />
            <LinkColumn title="Resources" links={RESOURCE_LINKS} />
          </div>
        </div>

        {/* Our Offices */}
        <div className="mt-12 sm:mt-14 rounded-2xl sm:rounded-[1.35rem] border border-white/12 bg-[#0a1218]/75 backdrop-blur-md p-5 sm:p-7 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 text-black shrink-0">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-lime-400">
                  Our Offices
                </h3>
                <p className="text-sm text-white/55 mt-0.5">
                  Visit us in Greece or India
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-lime-400 hover:text-lime-300 transition"
              >
                <Phone className="h-4 w-4" />
                Call us: {SITE_PHONE_DISPLAY}
              </a>
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-lime-400/90 text-lime-300 hover:bg-lime-400 hover:text-black text-sm font-semibold px-5 py-2.5 transition"
              >
                Get In Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {OFFICE_CARDS.map(
              ({ office, flag, flagAlt, label, thumb, thumbAlt }) => (
                <div
                  key={office.id}
                  className="group flex items-stretch gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-black/30 hover:border-lime-400/35 p-3.5 sm:p-4 transition"
                >
                  <div className="min-w-0 flex-1 flex flex-col">
                    <div className="flex items-start gap-3">
                      <Image
                        src={flag}
                        alt={flagAlt}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover object-top ring-2 ring-white/15 shrink-0 bg-white/5"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold uppercase tracking-wide text-white">
                          {label}
                        </p>
                        <p className="mt-1.5 text-[13px] text-white/70 leading-relaxed">
                          {office.address}
                        </p>
                      </div>
                    </div>
                    <a
                      href={office.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-lime-400 hover:text-lime-300 transition"
                    >
                      View Location
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <div className="relative w-[76px] sm:w-[104px] lg:w-[120px] shrink-0 rounded-xl overflow-hidden self-stretch min-h-[84px]">
                    <Image
                      src={thumb}
                      alt={thumbAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="120px"
                    />
                  </div>
                </div>
              ),
            )}
          </div>

          <a
            href={`mailto:${SITE_EMAIL}`}
            className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm text-white/55 hover:text-lime-300 transition break-all"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            {SITE_EMAIL}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row items-center gap-4 lg:gap-6 text-[12px] text-white/75">
          <p className="lg:flex-1 text-center lg:text-left">
            © 2026 Housing Saga. All rights reserved.
          </p>

          <div className="flex items-center gap-3 order-first lg:order-none">
            <span className="hidden sm:block h-px w-12 bg-lime-400/70" />
            <span className="uppercase tracking-[0.16em] text-white/90 text-[11px] font-semibold whitespace-nowrap">
              Better Stays · Brighter Futures
            </span>
            <span className="hidden sm:block h-px w-12 bg-lime-400/70" />
          </div>

          <div className="lg:flex-1 flex items-center justify-center lg:justify-end gap-3">
            <span className="text-white/60">Follow Us</span>
            <SocialRow variant="plain" />
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="
          fixed z-40
          bottom-[max(1rem,env(safe-area-inset-bottom))]
          right-[max(1rem,env(safe-area-inset-right))]
          sm:bottom-8 sm:right-8
          w-11 h-11 sm:w-12 sm:h-12
          rounded-full bg-lime-400
          flex items-center justify-center text-black
          shadow-lg hover:scale-105 transition
        "
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
