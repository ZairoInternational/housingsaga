import Link from "next/link";

import AccountPageHeader from "@/components/account/AccountPageHeader";
import ProfileShell from "@/components/profile/ProfileShell";
import { requireAccount } from "@/lib/account";

const STEPS = [
  {
    title: "Shortlist",
    body: "Save homes that fit your budget, location, and Golden Visa needs.",
  },
  {
    title: "Viewing",
    body: "Book a call or an on-site visit before you commit to an offer.",
  },
  {
    title: "Offer",
    body: "We coordinate the offer, reservation, and notary timeline with you.",
  },
  {
    title: "Completion",
    body: "Ownership transfer and, when you choose it, residency filing.",
  },
];

export default async function MyPurchasesPage() {
  const account = await requireAccount("/my-purchases");

  return (
    <ProfileShell>
      <AccountPageHeader
        eyebrow="Buyer"
        title={`${account.name}'s purchases`}
        subtitle="Track homes you are buying, from the first enquiry through completion. Nothing is listed here until a purchase is underway."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STEPS.map((step, index) => (
          <article
            key={step.title}
            className="rounded-2xl border border-gray-200 bg-[#f7f6f3] p-5 dark:border-white/10 dark:bg-[#13161f]"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-lime-600">
              0{index + 1}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {step.body}
            </p>
          </article>
        ))}
      </section>

      <article className="rounded-2xl border border-dashed border-gray-200 dark:border-white/10 px-6 py-14 text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          No purchases yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
          When you move forward on a home, the status, price, and next step
          will show up in this list.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex rounded-full bg-lime-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-700"
          >
            Browse properties
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
          >
            View wishlist
          </Link>
        </div>
      </article>
    </ProfileShell>
  );
}
