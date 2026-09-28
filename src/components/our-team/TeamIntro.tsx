import {
  Briefcase,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  {
    icon: Briefcase,
    title: "Experienced Professionals",
    desc: "Seasoned advisors across investment and residency",
  },
  {
    icon: MapPinned,
    title: "Local Market Experts",
    desc: "On-ground knowledge in Greece & India",
  },
  {
    icon: HeartHandshake,
    title: "Client-Focused Approach",
    desc: "Personal guidance from inquiry to closing",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Transparent",
    desc: "Clear process with verified partners",
  },
];

export default function TeamIntro() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-600 mb-3">
              <span className="h-px w-6 bg-lime-500" />
              Our Professional Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#14532d] tracking-tight leading-snug">
              The People Behind HousingSaga
            </h2>
            <p className="mt-4 text-[15px] text-gray-600 leading-relaxed max-w-xl">
              From founders to legal and operations leaders, our team combines
              India–Greece expertise so every client gets practical advice,
              verified options, and dependable execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-[#f7f8f5] p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-[#14532d]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#14532d]">{title}</p>
                  <p className="mt-0.5 text-xs text-gray-500 leading-snug">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
