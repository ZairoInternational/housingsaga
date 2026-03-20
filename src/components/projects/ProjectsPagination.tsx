"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProjectsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function ProjectsPagination({
  page,
  totalPages,
  onPageChange,
}: ProjectsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goToPage = (target: number) => {
    if (onPageChange) {
      onPageChange(target);
      return;
    }

    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (target <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(target));
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={!canPrev}
        className="px-3 py-1.5 rounded-full border text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Previous
      </button>

      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={!canNext}
        className="px-3 py-1.5 rounded-full border text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
}

