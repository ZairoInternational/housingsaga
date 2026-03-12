import TermsHero from "@/components/legal/TermsHero";

export default function TermsAndConditionsPage() {
  return (
    <main className="flex flex-col">
      <TermsHero />
      <section className="bg-white text-[#111]">
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20 lg:py-24 space-y-10 text-sm sm:text-base text-gray-700">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              1. Acceptance Of Terms
            </h2>
            <p>
              By accessing or using HousingSaga, you agree to be bound by these
              Terms &amp; Conditions and all applicable laws. If you do not agree,
              you may not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              2. Use Of The Platform
            </h2>
            <p className="mb-2">
              You agree to use HousingSaga only for lawful purposes and in
              accordance with these Terms. You must not:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Misrepresent property information.</li>
              <li>Attempt to interfere with or disrupt the platform.</li>
              <li>Use the platform to send spam or unauthorized communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              3. Listings And Content
            </h2>
            <p>
              You are responsible for the accuracy and legality of any property
              listings or content you submit. HousingSaga may review or remove
              content that violates these Terms or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              4. Limitation Of Liability
            </h2>
            <p>
              HousingSaga is provided on an &quot;as is&quot; basis. While we aim
              for reliability and uptime, we do not guarantee uninterrupted
              access. To the fullest extent permitted by law, we are not liable
              for indirect or consequential damages arising from use of the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              5. Changes To These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              platform after changes become effective constitutes acceptance of the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              6. Contact
            </h2>
            <p>
              For questions regarding these Terms &amp; Conditions, please contact
              us using the information available on the contact page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

