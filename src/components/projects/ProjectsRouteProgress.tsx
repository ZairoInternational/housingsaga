"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function isProjectsRoute(pathname: string) {
  return pathname === "/projects" || pathname.startsWith("/projects/");
}

function ProjectsRouteProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const start = () => setPending(true);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (!isProjectsRoute(url.pathname)) return;

      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${url.pathname}${url.search}`;
      if (current === next) return;

      start();
    };

    const onCustomStart = () => start();

    document.addEventListener("click", onClick, true);
    window.addEventListener("housingsaga:projects-nav", onCustomStart);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("housingsaga:projects-nav", onCustomStart);
    };
  }, []);

  useEffect(() => {
    if (!pending) return;
    const t = window.setTimeout(() => setPending(false), 8000);
    return () => window.clearTimeout(t);
  }, [pending]);

  if (!pending) return null;

  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime-400/25 overflow-hidden">
        <div className="h-full w-full origin-left animate-pulse bg-lime-400" />
      </div>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 flex items-start justify-center pt-[22vh]">
        <div className="rounded-2xl border border-white/15 bg-[#0f141c]/92 px-5 py-4 shadow-xl flex items-center gap-3">
          <span className="h-5 w-5 rounded-full border-2 border-lime-400/30 border-t-lime-400 animate-spin" />
          <span className="text-sm font-medium text-white">
            Loading projects…
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsRouteProgress() {
  return (
    <Suspense fallback={null}>
      <ProjectsRouteProgressInner />
    </Suspense>
  );
}

/** Call before router.push('/projects...') so the loader shows immediately. */
export function signalProjectsNavigation() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("housingsaga:projects-nav"));
}
