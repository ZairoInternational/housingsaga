import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";
import {
  SITE_EMAIL,
  SITE_OFFICES,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_WHATSAPP_URL,
} from "@/lib/site-contact";

const cards = [
  {
    icon: MapPin,
    title: "Greece Office",
    lines: [SITE_OFFICES[0].address],
  },
  {
    icon: MapPin,
    title: "India Office",
    lines: [SITE_OFFICES[1].address],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [SITE_PHONE_DISPLAY, "Mon–Fri · 8am–6pm"],
    href: `tel:${SITE_PHONE_TEL}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [SITE_EMAIL, "We reply within 24–48 hours"],
    href: `mailto:${SITE_EMAIL}`,
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon–Fri: 8am–6pm", "Sat–Sun: By appointment"],
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    lines: ["Chat on WhatsApp", "Instant support when online"],
    href: SITE_WHATSAPP_URL,
    external: true,
  },
] as const;

export default function ContactInfoSection() {
  return (
    <section className="bg-[#f6f7f4] py-12 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#14532d]">
                    {card.title}
                  </h3>
                  {card.lines.map((line) => (
                    <p
                      key={line}
                      className="mt-0.5 text-[13px] text-gray-600 leading-snug break-words"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </>
            );

            const className =
              "flex items-start gap-3.5 rounded-2xl border border-white bg-white px-4 py-4 shadow-[0_8px_30px_rgba(20,83,45,0.05)] hover:shadow-[0_10px_36px_rgba(20,83,45,0.09)] transition";

            if ("href" in card && card.href) {
              return (
                <a
                  key={card.title}
                  href={card.href}
                  {...("external" in card && card.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <div key={card.title} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
