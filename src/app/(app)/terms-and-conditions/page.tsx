 "use client";
import TermsHero from "@/components/legal/TermsHero";
import { ShieldCheck, FileText, Wallet, Scale, LockKeyhole } from "lucide-react";
import { motion } from "motion/react";

export default function TermsAndConditionsPage() {
  const scrollTo = (
    id:
      | "introduction"
      | "services"
      | "eligibility"
      | "visa"
      | "payments"
      | "client-responsibility"
      | "third-party"
      | "intellectual-property"
      | "liability"
      | "governing-law"
      | "changes"
      | "refund-policy"
      | "legal-disclaimer"
      | "gdpr",
  ) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex flex-col">
      <TermsHero />
      <section className="bg-[#f5f5f5] dark:bg-[#050712] text-[#111] dark:text-white/90">
        <div className="max-w-6xl mx-auto px-6 py-14 sm:py-16 lg:py-20 grid gap-10 lg:grid-cols-[260px,minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#0b101b] px-4 py-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-lime-500/15 border border-lime-400/30 flex items-center justify-center text-lime-400">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-lime-300">
                      Legal Center
                    </p>
                    <p className="text-xs text-gray-300">
                      Terms, refunds, disclaimers &amp; GDPR.
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400">
                  Last updated{" "}
                  <span className="font-semibold text-gray-100">17 March 2026</span>
                </p>
              </div>

              <nav className="rounded-2xl border border-white/10 bg-[#0b101b] px-3 py-4 text-xs text-gray-300 space-y-1">
                <SidebarItem
                  icon={FileText}
                  label="Terms & Conditions"
                  onClick={() => scrollTo("introduction")}
                />
                <SidebarItem icon={Wallet} label="Refund Policy" onClick={() => scrollTo("refund-policy")} />
                <SidebarItem
                  icon={Scale}
                  label="Legal Disclaimer"
                  onClick={() => scrollTo("legal-disclaimer")}
                />
                <SidebarItem
                  icon={LockKeyhole}
                  label="GDPR & Data"
                  onClick={() => scrollTo("gdpr")}
                />
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-10 text-sm sm:text-base text-gray-800 dark:text-gray-200">
            {/* Meta + small illustration */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-500 dark:text-gray-400 mb-1">
                    Terms &amp; Conditions — Housing Saga
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Effective Date:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      2026-03-17
                    </span>
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center h-12 w-12 rounded-2xl bg-lime-500/10 border border-lime-400/30 text-lime-400 shadow-sm">
                  <ShieldCheck size={22} />
                </div>
              </div>
            </motion.section>

            {/* 1. Introduction */}
            <motion.section
            id="introduction"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Welcome to Housing Saga. By accessing our website or using our services, you agree to
              comply with these Terms &amp; Conditions. If you do not agree, please do not use our
              services.
            </p>
            </motion.section>

            {/* 2. Services */}
            <motion.section
            id="services"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.03 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">2. Services</h2>
            <p className="mb-2">Housing Saga provides:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>International real estate advisory</li>
              <li>Greece Golden Visa assistance</li>
              <li>Property sourcing and investment consultation</li>
              <li>Coordination with legal and local partners</li>
            </ul>
            <p className="mt-2">
              We act as a facilitator and consultant, not the final authority for visa approvals.
            </p>
            </motion.section>

            {/* 3. Eligibility */}
            <motion.section
            id="eligibility"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.04 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">3. Eligibility</h2>
            <p className="mb-2">By using our services, you confirm:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>You are at least 18 years old</li>
              <li>You can legally enter into contracts</li>
              <li>You will provide accurate and complete information</li>
            </ul>
            </motion.section>

            {/* 4. No Guarantee of Visa Approval */}
            <motion.section
            id="visa"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              4. No Guarantee of Visa Approval
            </h2>
            <p className="mb-2">
              Housing Saga assists with documentation and process coordination; however:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Final approval is subject to Greek government authorities</li>
              <li>We do not guarantee visa approval outcomes</li>
            </ul>
            </motion.section>

            {/* 5. Payments & Fees */}
            <motion.section
            id="payments"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.06 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">5. Payments &amp; Fees</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>All service fees will be communicated in advance</li>
              <li>
                Payments made to third parties (legal, government, developers) are separate
              </li>
              <li>Fees once paid may be non-refundable, unless stated otherwise</li>
            </ul>
            </motion.section>

            {/* 6. Client जिम्मेदारी (Responsibility) */}
            <motion.section
            id="client-responsibility"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.07 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              6. Client जिम्मेदारी (Responsibility)
            </h2>
            <p className="mb-2">Clients must:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide genuine and accurate documents</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Respond in a timely manner during the process</li>
            </ul>
            <p className="mt-2">
              Housing Saga is not responsible for delays caused by incomplete or incorrect
              information.
            </p>
            </motion.section>

            {/* 7. Third-Party Services */}
            <motion.section
            id="third-party"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">7. Third-Party Services</h2>
            <p className="mb-2">We work with:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Real estate developers</li>
              <li>Legal advisors</li>
              <li>Government bodies</li>
            </ul>
            <p className="mt-2">
              We are not liable for the actions, delays, or services of third parties.
            </p>
            </motion.section>

            {/* 8. Intellectual Property */}
            <motion.section
            id="intellectual-property"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.09 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">8. Intellectual Property</h2>
            <p>
              All content on our website (text, design, branding) is owned by Housing Saga and
              cannot be copied or reused without permission.
            </p>
            </motion.section>

            {/* 9. Limitation of Liability */}
            <motion.section
            id="liability"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="mb-2">Housing Saga shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Investment losses</li>
              <li>Visa rejections</li>
              <li>Delays due to government processes</li>
              <li>Market fluctuations</li>
            </ul>
            </motion.section>

            {/* 10. Governing Law */}
            <motion.section
            id="governing-law"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.11 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">10. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of India. Any disputes shall fall under the
              jurisdiction of New Delhi courts.
            </p>
            </motion.section>

            {/* 11. Changes to Terms */}
            <motion.section
            id="changes"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: 0.12 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">11. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of services implies acceptance of
              updated terms.
            </p>
            </motion.section>

            {/* Divider */}
            <div className="h-px w-full bg-gray-300/80 dark:bg-white/10 my-2" />

            {/* Refund Policy */}
            <motion.section
            id="refund-policy"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Refund Policy</h2>
            <p className="mb-4">Housing Saga</p>

            <h3 className="font-semibold mb-1">1. Service Fees</h3>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Consultation and advisory fees are generally non-refundable</li>
              <li>Refunds (if applicable) will be clearly defined in the service agreement</li>
            </ul>

            <h3 className="font-semibold mb-1">2. Third-Party Payments</h3>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>
                Payments made to developers, legal partners, or government bodies are non-refundable
              </li>
              <li>These are governed by respective third-party policies</li>
            </ul>

            <h3 className="font-semibold mb-1">3. Refund Eligibility</h3>
            <p className="mb-1">Refunds may be considered only if:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Service was not initiated</li>
              <li>Duplicate payment was made</li>
              <li>Explicitly agreed in writing</li>
            </ul>

            <h3 className="font-semibold mb-1">4. Processing Time</h3>
            <p className="mb-3">
              Approved refunds (if any) will be processed within 7–15 business days.
            </p>

            <h3 className="font-semibold mb-1">5. Cancellation</h3>
            <p>
              Clients must submit cancellation requests via email. Approval is subject to review.
            </p>
            </motion.section>

            {/* Divider */}
            <div className="h-px w-full bg-gray-300/80 dark:bg-white/10 my-2" />

            {/* Legal Disclaimer */}
            <motion.section
            id="legal-disclaimer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Legal Disclaimer</h2>
            <p className="mb-4">Housing Saga</p>

            <h3 className="font-semibold mb-1">1. General Disclaimer</h3>
            <p className="mb-2">
              Housing Saga provides advisory and facilitation services for international real estate
              and Golden Visa programs.
            </p>
            <p className="mb-1">We do not act as:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Government authority</li>
              <li>Immigration authority</li>
              <li>Legal decision-maker</li>
            </ul>

            <h3 className="font-semibold mb-1">2. Investment Risk Disclaimer</h3>
            <p className="mb-1">Real estate investments are subject to:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Market risks</li>
              <li>Regulatory changes</li>
              <li>Economic conditions</li>
            </ul>
            <p className="mb-1">Housing Saga does not guarantee:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Property appreciation</li>
              <li>Rental income</li>
              <li>Return on investment</li>
            </ul>

            <h3 className="font-semibold mb-1">3. Visa Disclaimer</h3>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Golden Visa approval depends solely on Greek government authorities</li>
              <li>Policies may change without prior notice</li>
            </ul>

            <h3 className="font-semibold mb-1">4. Information Accuracy</h3>
            <p className="mb-1">We strive to keep all information accurate; however:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Content may change over time</li>
              <li>We are not liable for outdated or incomplete information</li>
            </ul>

            <h3 className="font-semibold mb-1">5. No Legal or Financial Advice</h3>
            <p className="mb-1">Housing Saga does not provide:</p>
            <ul className="list-disc list-inside space-y-1 mb-0">
              <li>Legal advice</li>
              <li>Tax advice</li>
              <li>Financial advisory</li>
            </ul>
            <p className="mt-2">
              Clients are encouraged to consult licensed professionals for legal, tax, and financial
              advice.
            </p>
            </motion.section>

            {/* Divider */}
            <div className="h-px w-full bg-gray-300/80 dark:bg-white/10 my-2" />

            {/* GDPR & Data Protection Addendum */}
            <motion.section
            id="gdpr"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0b101b] shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              GDPR &amp; Data Protection Addendum (For EU Compliance)
            </h2>

            <h3 className="font-semibold mb-1">1. Lawful Basis for Processing</h3>
            <p className="mb-1">We process data based on:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>User consent</li>
              <li>Contractual necessity</li>
              <li>Legal obligations</li>
            </ul>

            <h3 className="font-semibold mb-1">2. Data Subject Rights (EU Clients)</h3>
            <p className="mb-1">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Access your data</li>
              <li>Rectify incorrect data</li>
              <li>Request erasure (“Right to be Forgotten”)</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
            </ul>

            <h3 className="font-semibold mb-1">3. Cross-Border Data Transfer</h3>
            <p className="mb-1">Your data may be transferred between:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>India</li>
              <li>Greece</li>
              <li>Other jurisdictions involved in service delivery</li>
            </ul>
            <p className="mb-3">We ensure appropriate safeguards are in place.</p>

            <h3 className="font-semibold mb-1">4. Data Protection Contact</h3>
            <p>
              For GDPR-related requests, please contact us at{" "}
              <span className="font-medium">support@example.com</span>.
            </p>
            </motion.section>
          </div>
        </div>
      </section>
    </main>
  );
}

interface SidebarItemProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  onClick: () => void;
}

function SidebarItem({ icon: Icon, label, onClick }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-left hover:bg-white/5 hover:text-lime-300 transition-colors group"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-lime-300 group-hover:bg-lime-500/10 group-hover:text-lime-300 transition-colors">
        <Icon size={16} />
      </span>
      <span className="text-[11px] font-semibold tracking-[0.16em] uppercase">
        {label}
      </span>
    </button>
  );
}

