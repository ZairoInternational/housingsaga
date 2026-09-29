"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileImage, FileText, Images } from "lucide-react";
import MediaAccessModal from "@/components/media-kit/MediaAccessModal";

const items = [
  {
    title: "Logo Pack",
    description:
      "Primary and secondary HousingSaga logos in PNG and SVG formats.",
    icon: FileImage,
  },
  {
    title: "Brand Guidelines",
    description:
      "Usage rules, clear space, and color specifications for the brand.",
    icon: FileText,
  },
  {
    title: "Photos & Banners",
    description:
      "High-resolution product and lifestyle images for media coverage.",
    icon: Images,
  },
];

export default function MediaAssets() {
  const [open, setOpen] = useState(false);
  const [assetTitle, setAssetTitle] = useState("Media Kit");

  const requestAccess = (title: string) => {
    setAssetTitle(title);
    setOpen(true);
  };

  return (
    <section className="bg-[#f5f5f5] text-[#111] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm text-lime-600 mb-3 uppercase tracking-[0.22em] font-semibold">
              Brand Resources
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#14532d]">
              Ready-To-Use Media Assets
            </h2>
            <p className="mt-3 text-sm text-gray-600 max-w-xl leading-relaxed">
              Request official logos and guidelines — we share approved packs
              with press, partners, and collaborators by email.
            </p>
          </div>
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full border-2 border-lime-500 text-[#14532d] hover:bg-lime-50 font-semibold text-sm px-5 py-2.5 transition"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-lime-100 text-[#14532d] mb-4">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#14532d]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => requestAccess(item.title)}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold bg-lime-400 hover:bg-lime-300 text-black transition"
                >
                  Request Access
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <MediaAccessModal
        open={open}
        onClose={() => setOpen(false)}
        assetTitle={assetTitle}
      />
    </section>
  );
}
