import { SITE_MAP_EMBED_QUERY } from "@/lib/site-contact";

export default function MapSection() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    SITE_MAP_EMBED_QUERY,
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="w-full h-[420px]">
      <iframe
        title="Housing Saga — Greece office location"
        src={mapSrc}
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
