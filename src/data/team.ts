export type TeamMemberProfile = {
  id: string;
  name: string;
  role: string;
  image: string;
  shortBio: string;
  fullBio: string;
  experience: string;
  location: string;
  email: string;
  highlights: {
    title: string;
    description: string;
  }[];
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
};

export const TEAM_MEMBERS: TeamMemberProfile[] = [
  {
    id: "zaid",
    name: "Zaid Bin Hashmat",
    role: "Founder",
    image: "/team-7.jpeg",
    shortBio:
      "Leads HousingSaga’s vision across India and Greece — connecting investors with trusted Golden Visa and property pathways.",
    fullBio:
      "Zaid founded HousingSaga to make cross-border property investment simple and transparent for Indian clients. He focuses on strategy, partnerships, and building a client-first advisory that bridges India and Greece with verified inventory and clear processes.",
    experience: "10+ Years Experience",
    location: "Athens, Greece",
    email: "zaid@housingsaga.com",
    highlights: [
      {
        title: "Professional Background",
        description:
          "Journey, achievements, and leadership experience in international real estate.",
      },
      {
        title: "Expertise",
        description:
          "Investment strategy, market expansion, and Golden Visa-aligned growth.",
      },
      {
        title: "Vision & Values",
        description:
          "Building long-term value for clients through trust and transparency.",
      },
      {
        title: "Connect",
        description:
          "Reach out for partnerships, consultations, or strategic opportunities.",
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/",
      email: "mailto:zaid@housingsaga.com",
    },
  },
  {
    id: "maria-saridou",
    name: "Maria Saridou",
    role: "Founder of Greece Branch",
    image: "/team-1.png",
    shortBio:
      "Leads HousingSaga’s Greece operations and client experience on the ground in Athens.",
    fullBio:
      "Maria guides investors through local market realities in Greece — from property shortlisting to coordination with legal and management partners. She ensures every client receives attentive, on-ground support throughout their purchase and residency journey.",
    experience: "8+ Years Experience",
    location: "Athens, Greece",
    email: "maria@housingsaga.com",
    highlights: [
      {
        title: "Professional Background",
        description:
          "Deep local networks across Greek residential and investment markets.",
      },
      {
        title: "Expertise",
        description:
          "Client advisory, property matching, and Greece branch leadership.",
      },
      {
        title: "Vision & Values",
        description:
          "Warm, transparent service that makes Greece feel accessible for overseas buyers.",
      },
      {
        title: "Connect",
        description:
          "Ideal contact for Greece viewings, local guidance, and branch partnerships.",
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/",
      email: "mailto:maria@housingsaga.com",
    },
  },
  {
    id: "seda",
    name: "Seda Celen",
    role: "Real Estate Consultant",
    image: "/team-2.png",
    shortBio:
      "Helps clients compare properties, locations, and investment goals with clear recommendations.",
    fullBio:
      "Seda works closely with buyers to shortlist homes and investments that fit budget, lifestyle, and Golden Visa criteria. She focuses on practical comparisons so clients can decide with confidence.",
    experience: "6+ Years Experience",
    location: "Athens, Greece",
    email: "seda@housingsaga.com",
    highlights: [
      {
        title: "Professional Background",
        description:
          "Hands-on consulting across residential and investment listings.",
      },
      {
        title: "Expertise",
        description:
          "Property shortlisting, buyer consultations, and market walkthroughs.",
      },
      {
        title: "Vision & Values",
        description:
          "Clear advice without pressure — the right home for the right goal.",
      },
      {
        title: "Connect",
        description: "Reach out to schedule a consultation or property review.",
      },
    ],
    socials: {
      email: "mailto:seda@housingsaga.com",
    },
  },
  {
    id: "maria-boutali",
    name: "Maria Boutali",
    role: "Lawyer",
    image: "/team-3.png",
    shortBio:
      "Supports legal due diligence, compliance, and documentation for cross-border purchases.",
    fullBio:
      "Maria Boutali advises on the legal side of Greek property transactions and residency-related documentation. She helps keep purchases compliant, paperwork organized, and client interests protected.",
    experience: "9+ Years Experience",
    location: "Athens, Greece",
    email: "legal@housingsaga.com",
    highlights: [
      {
        title: "Professional Background",
        description:
          "Legal practice focused on property and investor documentation.",
      },
      {
        title: "Expertise",
        description:
          "Due diligence, contracts coordination, and compliance checks.",
      },
      {
        title: "Vision & Values",
        description:
          "Protecting clients with clarity, care, and rigorous review.",
      },
      {
        title: "Connect",
        description:
          "Contact for legal questions related to your Greece purchase.",
      },
    ],
    socials: {
      email: "mailto:legal@housingsaga.com",
    },
  },
  {
    id: "siddartha",
    name: "Siddartha Jain",
    role: "Chief Marketing Officer",
    image: "/team-4.jpeg",
    shortBio:
      "Shapes HousingSaga’s brand, content, and investor communication across markets.",
    fullBio:
      "Siddartha leads marketing strategy so HousingSaga stays clear and credible — from educational content to campaigns that help investors discover Golden Visa and property opportunities.",
    experience: "7+ Years Experience",
    location: "India",
    email: "siddartha@housingsaga.com",
    highlights: [
      {
        title: "Professional Background",
        description:
          "Brand and growth leadership across real estate and consumer markets.",
      },
      {
        title: "Expertise",
        description:
          "Positioning, campaigns, and investor education content.",
      },
      {
        title: "Vision & Values",
        description:
          "Honest storytelling that builds trust before the first meeting.",
      },
      {
        title: "Connect",
        description:
          "Reach out for media, partnerships, or brand collaborations.",
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/",
      email: "mailto:siddartha@housingsaga.com",
    },
  },
  {
    id: "ankita",
    name: "Ankita Nigam",
    role: "Chief Operating Officer",
    image: "/ankita_nigam.png",
    shortBio:
      "Keeps operations, client workflows, and delivery coordinated across India and Greece.",
    fullBio:
      "Ankita oversees day-to-day operations so inquiries, viewings, and transaction steps move smoothly. She focuses on process quality and a reliable client experience from first contact to closing.",
    experience: "8+ Years Experience",
    location: "Kanpur, India",
    email: "ankita@housingsaga.com",
    highlights: [
      {
        title: "Professional Background",
        description:
          "Operations leadership across teams, partners, and client journeys.",
      },
      {
        title: "Expertise",
        description:
          "Process design, delivery quality, and cross-border coordination.",
      },
      {
        title: "Vision & Values",
        description:
          "Reliable systems that make complex journeys feel simple.",
      },
      {
        title: "Connect",
        description:
          "Contact for operational partnerships or process discussions.",
      },
    ],
    socials: {
      email: "mailto:ankita@housingsaga.com",
    },
  },
];

export function getTeamMember(id: string): TeamMemberProfile | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}
