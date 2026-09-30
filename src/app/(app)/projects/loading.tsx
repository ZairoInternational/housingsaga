import ProjectsResultsSkeleton from "@/components/projects/ProjectsResultsSkeleton";

export default function ProjectsLoading() {
  return (
    <main className="flex flex-col bg-gray-50 dark:bg-[#050816] min-h-screen">
      {/* Hero skeleton */}
      <div className="relative w-full h-[520px] sm:h-[600px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
        <div className="relative z-10 px-6 sm:px-10 md:px-16 w-full max-w-[1200px] mx-auto pt-40 sm:pt-52 space-y-4">
          <div className="h-4 w-40 rounded bg-white/20 animate-pulse" />
          <div className="h-12 sm:h-16 w-[70%] max-w-xl rounded-lg bg-white/25 animate-pulse" />
          <div className="h-4 w-[55%] max-w-md rounded bg-white/15 animate-pulse" />
        </div>
      </div>

      {/* Search skeleton */}
      <section className="w-full py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white px-4 sm:px-6 py-5 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 h-12 rounded-xl bg-gray-100 animate-pulse" />
              <div className="w-full sm:w-40 h-12 rounded-xl bg-gray-100 animate-pulse" />
              <div className="w-full sm:w-40 h-12 rounded-xl bg-gray-100 animate-pulse" />
              <div className="lg:w-44 h-12 rounded-xl bg-lime-200/70 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <ProjectsResultsSkeleton />
    </main>
  );
}
