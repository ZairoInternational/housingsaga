export interface ProjectUtilitiesProps {
  utilities: string[];
}

export default function ProjectUtilities({ utilities }: ProjectUtilitiesProps) {
  if (utilities.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-12 border-t border-gray-100 pt-10">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Utilities included
        </h2>
        <div className="grid gap-y-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
          {utilities.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <span className="flex-shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 shadow-sm">
                <svg
                  className="h-3 w-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              </span>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
