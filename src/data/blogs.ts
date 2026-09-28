export type BlogCategory =
  | "Investment"
  | "Buying Guide"
  | "Lifestyle"
  | "Market Trends"
  | "Property Tips";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  image: string;
  featured?: boolean;
  publishedAt: string;
  author: string;
  /** Paragraphs for the detail page body */
  content: string[];
};

export const BLOG_CATEGORIES: Array<"All" | BlogCategory> = [
  "All",
  "Investment",
  "Buying Guide",
  "Lifestyle",
  "Market Trends",
  "Property Tips",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "aegean-properties-investment-opportunity",
    title: "Why Aegean Properties Are the Next Big Investment Opportunity",
    excerpt:
      "Discover why coastal Aegean markets are attracting global investors — from rental yield potential to Golden Visa pathways and long-term appreciation.",
    category: "Investment",
    readTime: "5 min read",
    image: "/palmhouse.jpg",
    featured: true,
    publishedAt: "2025-11-12",
    author: "HousingSaga Editorial",
    content: [
      "The Aegean coastline has quietly become one of Europe’s most compelling residential investment corridors. Strong tourism demand, limited supply of quality inventory, and clearer residency pathways are converging at the same time.",
      "Investors who once focused only on major city cores are now looking at carefully selected coastal assets — villas, boutique apartments, and conversion-ready buildings that can serve both personal use and short-term rental strategies.",
      "Rental performance through platforms and professional operators such as VacationSaga can help offset holding costs while the asset appreciates. Pairing the right location with the right product type is what separates average returns from resilient ones.",
      "Before you buy, evaluate access, year-round demand, operating costs, and whether the purchase price supports Golden Visa eligibility where that pathway matters to you. HousingSaga helps investors shortlist properties that balance lifestyle and numbers.",
    ],
  },
  {
    slug: "choose-right-property-in-greece",
    title: "How to Choose the Right Property in Greece",
    excerpt:
      "A practical framework for comparing locations, property types, and ownership goals before you commit.",
    category: "Buying Guide",
    readTime: "6 min read",
    image: "/lakeview.jpg",
    featured: true,
    publishedAt: "2025-10-28",
    author: "HousingSaga Editorial",
    content: [
      "Choosing property in Greece starts with clarity on purpose: primary home, holiday retreat, rental investment, or residency pathway. Each goal points to different regions, sizes, and price bands.",
      "Location still leads every decision. Consider airport access, seasonality, neighborhood amenities, and whether the micro-market supports your intended use.",
      "Next, stress-test the asset itself — condition, paperwork, condominium rules, and realistic renovation budgets. A beautiful listing photo is not a substitute for due diligence.",
      "Finally, model the total cost of ownership in euros: purchase taxes, notary fees, annual ownership costs, and expected income if you plan to rent. HousingSaga advisors can walk you through this checklist property by property.",
    ],
  },
  {
    slug: "living-by-the-aegean-lifestyle",
    title: "Living by the Aegean: A Lifestyle Worth Investing In",
    excerpt:
      "From morning swims to evening tavernas — why lifestyle buyers are making Greece their second home.",
    category: "Lifestyle",
    readTime: "4 min read",
    image: "/greenview.jpg",
    featured: true,
    publishedAt: "2025-10-04",
    author: "HousingSaga Editorial",
    content: [
      "Beyond returns, many buyers are drawn to Greece for a calmer rhythm of life — light, sea, food culture, and communities that still feel personal.",
      "A well-chosen home near the water can become a family base for summers and remote-work winters, while still supporting selective rental periods when you are away.",
      "Lifestyle investments work best when they remain easy to maintain. Look for reliable property management, good connectivity, and a layout that suits both guests and owners.",
      "If you are exploring this path, start with regions that match how you actually want to spend time — not only where brochure images look the best.",
    ],
  },
  {
    slug: "greek-real-estate-market-trends-2025",
    title: "Greek Real Estate Market Trends in 2025",
    excerpt:
      "Key signals shaping demand, pricing, and investor behavior across Greece’s residential markets.",
    category: "Market Trends",
    readTime: "3 min read",
    image: "/orchid.jpg",
    publishedAt: "2025-09-18",
    author: "HousingSaga Research",
    content: [
      "In 2025, Greek residential demand continues to be supported by tourism recovery, foreign buyer interest, and limited high-quality supply in prime pockets.",
      "Price growth is uneven — premium coastal and well-connected urban niches outperform secondary inventory that needs heavy renovation without a clear income plan.",
      "Investors are more selective: underwriting rental scenarios carefully, verifying title and permits, and favoring assets that can serve dual use.",
      "Expect continued interest in properties aligned with residency programs and professionally managed holiday stays.",
    ],
  },
  {
    slug: "first-time-buyer-checklist-greece",
    title: "First-Time Buyer Checklist for Greece",
    excerpt:
      "Documents, timelines, and common pitfalls first-time international buyers should prepare for.",
    category: "Buying Guide",
    readTime: "7 min read",
    image: "/mixed.jpg",
    publishedAt: "2025-09-02",
    author: "HousingSaga Editorial",
    content: [
      "International first-time buyers should line up banking, tax identification, and legal representation early — these steps often take longer than the property search itself.",
      "Build a realistic budget that includes acquisition costs beyond the headline price, then shortlist only homes that fit both budget and intended use.",
      "Use independent legal review for title, planning compliance, and any shared-building obligations before you sign.",
      "HousingSaga can coordinate introductions to trusted local professionals so your first purchase stays structured and transparent.",
    ],
  },
  {
    slug: "maximize-holiday-rental-income",
    title: "How to Maximize Holiday Rental Income",
    excerpt:
      "Pricing, presentation, and operations tips that help coastal homes perform across the season.",
    category: "Property Tips",
    readTime: "5 min read",
    image: "/rentalexp.jpg",
    publishedAt: "2025-08-21",
    author: "HousingSaga Editorial",
    content: [
      "Strong holiday rental income comes from three levers: presentation, pricing discipline, and reliable operations.",
      "Professional photography, clear amenity lists, and accurate location context help listings convert. Dynamic pricing should reflect local events, seasonality, and lead time.",
      "On the operations side, fast guest communication and consistent cleaning standards protect reviews — the compounding engine of occupancy.",
      "Partnering with a capable operator can turn a second home into a performing asset without requiring you to manage every arrival.",
    ],
  },
  {
    slug: "golden-visa-property-basics",
    title: "Golden Visa Property Basics Explained",
    excerpt:
      "What buyers should know about qualifying property thresholds and choosing the right asset class.",
    category: "Investment",
    readTime: "6 min read",
    image: "/ft1-bg.jpg",
    publishedAt: "2025-08-05",
    author: "HousingSaga Editorial",
    content: [
      "Residency-linked property purchases require careful matching of budget, location rules, and personal goals. Not every attractive home is the right qualifying asset.",
      "Start with the current investment threshold that applies to your target area, then filter inventory that clearly meets or exceeds it.",
      "Treat the visa pathway as one layer of the decision — the property should still make sense as a home or income-producing asset on its own merits.",
      "Speak with HousingSaga before you shortlist so legal and commercial considerations stay aligned from day one.",
    ],
  },
  {
    slug: "designing-homes-for-remote-work",
    title: "Designing Homes for Remote Work by the Sea",
    excerpt:
      "Layouts, connectivity, and quiet zones that make coastal homes work for modern hybrid living.",
    category: "Lifestyle",
    readTime: "4 min read",
    image: "/contact-hero.jpg",
    publishedAt: "2025-07-19",
    author: "HousingSaga Editorial",
    content: [
      "Hybrid living by the sea needs more than a pretty view — it needs a reliable workspace, strong connectivity, and acoustic separation from living areas.",
      "Look for natural light, a dedicated desk zone, and outdoor space you can actually use between calls.",
      "If you also rent the home, flexible furniture plans help the same room serve guests and owners without feeling compromised.",
      "Small upgrades — lighting, ergonomic seating, and blackout options — often deliver outsized livability gains.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  const featured = blogPosts.filter((p) => p.featured);
  return featured.length >= 3 ? featured.slice(0, 3) : blogPosts.slice(0, 3);
}

export function getLatestPosts(limit = 4): BlogPost[] {
  return [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}
