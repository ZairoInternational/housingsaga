import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";

const PHONE_DISPLAY = "+91 9076621166";
const PHONE_TEL = "+919076621166";
const EMAIL = "support@housingsaga.com";

export default function ProjectContactAgent() {
  return (
    <div className="relative overflow-hidden rounded-[1.25rem] shadow-[0_10px_40px_rgba(20,83,45,0.12)] min-h-[320px]">
      <Image
        src="/ft1-bg.jpg"
        alt=""
        fill
        sizes="400px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/75" />

      <div className="relative z-10 flex min-h-[320px] flex-col justify-between p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-lime-400">
            Get in touch
          </p>
          <h3 className="mt-3 text-[1.35rem] font-bold text-white leading-snug max-w-[15ch]">
            Connect Directly With The Responsible Agent
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2.5">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2.5 text-sm text-white/95 hover:text-lime-300 transition"
            >
              <Phone className="h-4 w-4 text-white shrink-0" strokeWidth={1.75} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2.5 text-sm text-white/95 hover:text-lime-300 transition break-all"
            >
              <Mail className="h-4 w-4 text-white shrink-0" strokeWidth={1.75} />
              {EMAIL}
            </a>
          </div>

          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Property inquiry — HousingSaga")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-[#14532d] font-bold text-sm px-4 py-3.5 transition"
          >
            <Mail className="h-4 w-4" />
            Email Us
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
