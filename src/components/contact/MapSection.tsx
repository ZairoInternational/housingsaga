export default function MapSection() {
  return (
    <section className="w-full h-[420px]">
      <iframe
        src="https://maps.google.com/maps?q=london&t=&z=6&ie=UTF8&iwloc=&output=embed"
        className="w-full h-full border-0"
        loading="lazy"
      />
    </section>
  );
}
