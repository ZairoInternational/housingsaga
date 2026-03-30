"use client";

import React from "react";
import Slider from "@/components/ui/slider";
// import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
// import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import {  StarIcon } from "lucide-react";

type Testimonial = {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: `Innovative strategy and stunning execution transformed our brand. Highly impressed with the results and the seamless, professional partnership throughout.`,
    name: "Sarah Mandella",
    role: "Supervisor",
    avatar: "/review1.jpg",
  },
  {
    id: 2,
    text: `The team delivered outstanding results. Everything from communication to final output was handled with absolute professionalism.`,
    name: "Alex Johnson",
    role: "Founder",
    avatar: "/review2.jpg",
  },
];

// const logos = ["LUXORYN", "homexa", "Domlux", "LIVORANE", "estalia"];

export default function TestimonialSection() {
  return (
    <section className="bg-[#2b2420] text-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-start lg:border-r lg:border-white/10 lg:pr-10">
          <p className="text-xs sm:text-sm text-green-400 mb-2 sm:mb-4">
            • Highly Satisfied Clients
          </p>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-none mt-4 sm:mt-8 lg:mt-16">
            4.9/5
          </h2>

          <div className="flex gap-1 mt-3 sm:mt-4 text-green-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} size={22} className="sm:w-6 sm:h-6" fill="currentColor" />
            ))}
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mt-3 max-w-xs">
            4.9/5 based on 2,500+ reviews
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="overflow-hidden lg:pl-10">
          <Slider showDots={false} showArrows={true} className="w-full">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </Slider>
        </div>
      </div>

      {/* MARQUEE */}
      {/* <div className="mt-12 sm:mt-16 lg:mt-20 border-t border-white/10 pt-8 sm:pt-10">
        <InfiniteMarquee
          speed={20}
          gap={20}
          items={logos.map((logo, i) => ({
            id: i,
            content: (
              <span className="text-gray-400 text-base sm:text-lg tracking-wide">
                {logo}
              </span>
            ),
          }))}
        />
      </div> */}
    </section>
  );
}

type CardProps = {
  testimonial: Testimonial;
};

function TestimonialCard({ testimonial }: CardProps) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-3xl">
      <span className="text-green-400 text-5xl sm:text-6xl lg:text-7xl">“</span>

      <p className="text-lg sm:text-2xl lg:text-3xl leading-relaxed text-gray-200">
        {testimonial.text}
      </p>

      <div className="flex items-center gap-4 mt-6">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={100}
          height={100}
          className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover"
        />

        <div>
          <p className="font-medium text-sm sm:text-base">{testimonial.name}</p>
          <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
