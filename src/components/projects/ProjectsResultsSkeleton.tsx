function PropertyCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-[#111] shadow-lg animate-pulse"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="h-[260px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800" />
        <div className="absolute top-3.5 left-3.5 h-8 w-28 rounded-full bg-white/10" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="space-y-2 w-2/3">
            <div className="h-5 rounded bg-white/15" />
            <div className="h-3 w-1/2 rounded bg-lime-400/30" />
          </div>
          <div className="h-8 w-8 rounded-full bg-lime-400/40" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsResultsSkeleton() {
  return (
    <section className="py-2 sm:py-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-7 w-48 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { PropertyCardSkeleton };
