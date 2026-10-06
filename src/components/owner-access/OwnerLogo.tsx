import Image from "next/image";

export default function OwnerLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`w-fit rounded-full bg-black px-3 py-1.5 ${className}`}>
      <Image
        src="/housinglogo.png"
        alt="HousingSaga"
        width={140}
        height={58}
        className="h-8 w-[7.5rem] object-contain object-left"
        priority
      />
    </div>
  );
}
