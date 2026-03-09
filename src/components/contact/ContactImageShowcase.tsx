import Image from "next/image";

export default function ContactImageShowcase() {
  return (
    <section className="bg-[#f5f5f5] pb-28">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div className="relative h-[320px] rounded-[20px] overflow-hidden">
          <Image
            src="/contact-show1.jfif"
            alt="agent"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-[320px] rounded-[20px] overflow-hidden">
          <Image
            src="/contact-show2.jfif"
            alt="house"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
