export default function ProjectDetailLoading() {
  return (
    <main className="bg-white min-h-screen pb-12">
      {/* Hero */}
      <div className="relative w-full h-[220px] sm:h-[280px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 space-y-3">
          <div className="h-3 w-48 rounded bg-white/20 animate-pulse" />
          <div className="h-9 w-[70%] max-w-lg rounded-lg bg-white/25 animate-pulse" />
        </div>
      </div>

      {/* Media summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="aspect-[16/10] rounded-2xl bg-gray-200 animate-pulse" />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-gray-100 animate-pulse" />
            <div className="h-10 w-40 rounded-full bg-lime-200 animate-pulse mt-4" />
            <div className="flex flex-wrap gap-2 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-28 rounded-full bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About + sidebar */}
      <section className="mt-10 sm:mt-14 bg-[#fbfcfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            <div className="flex-1 space-y-4 min-w-0">
              <div className="h-8 w-56 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-gray-100 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-2xl bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            </div>
            <aside className="w-full lg:w-[380px] shrink-0 space-y-4">
              <div className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
              <div className="h-40 rounded-2xl bg-gray-100 animate-pulse" />
              <div className="h-36 rounded-2xl bg-gray-100 animate-pulse" />
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
        <div className="h-[320px] rounded-2xl bg-gray-100 animate-pulse mt-8" />
      </div>
    </main>
  );
}
