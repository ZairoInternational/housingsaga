import PrivacyHero from "@/components/legal/PrivacyHero";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col">
      <PrivacyHero />
      <section className="bg-white text-[#111]">
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20 lg:py-24 space-y-10 text-sm sm:text-base text-gray-700">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy explains how HousingSaga collects, uses, and
              safeguards personal information when you use our website and
              services. By accessing or using HousingSaga, you agree to this
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-2">
              We collect information you provide directly to us as well as data
              generated when you interact with the platform. This may include:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Account details such as name, email, and phone number.</li>
              <li>Property information you submit for listings.</li>
              <li>Usage data such as pages visited and actions taken.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-2">We use collected data to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide and improve our property listing services.</li>
              <li>Personalize recommendations and content.</li>
              <li>Communicate updates, alerts, and support responses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              4. Data Sharing
            </h2>
            <p>
              We do not sell your personal information. We may share data with
              trusted service providers and partners who help us operate the
              platform, subject to appropriate safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              5. Your Choices
            </h2>
            <p>
              You can update or correct your account information at any time.
              You may also contact us to request deletion of certain data,
              subject to legal or contractual obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              6. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please reach out
              through the contact page linked in the footer.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

