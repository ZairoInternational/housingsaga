import ProjectsDetailHero from "@/components/projects/ProjectsDetailHero";
import ProjectMediaSummary from "@/components/projects/ProjectMediaSummary";
import ProjectAbout from "@/components/projects/ProjectAbout";
import ProjectKeyFeatures from "@/components/projects/ProjectKeyFeatures";
import ProjectContactAgent from "@/components/projects/ProjectContactAgent";
import ProjectPropertyDetails from "@/components/projects/ProjectPropertyDetails";
import ProjectAmenities from "@/components/projects/ProjectAmenities";
import ProjectUtilities from "@/components/projects/ProjectUtilities";
import ProjectInteriorTabs from "@/components/projects/ProjectInteriorTabs";
import ProjectMapSection from "@/components/projects/ProjectMapSection";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";
import type { HouseValidationSchema } from "@/schemas/property.schema";
import { formatEurAmount } from "@/lib/format-currency";
import { isGoldenVisaEligible } from "@/lib/golden-visa-eligibility";
import {
  formatDashCaseLabel,
  formatFloorStatus,
} from "@/lib/property-display";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

interface ProjectDetail {
  id: string;
  name: string;
  summary: string;
  description: string;
  city: string;
  state: string;
  address: string;
  propertyType: string;
  carpetArea: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  floors?: number | null;
  propertyOnFloor?: number;
  furnishing: string;
  constructionYear?: number;
  utilities: string[];
  leaseTerm: string;
  depositAmount?: number;
  price: number;
  images: string[];
  video?: string;
  amenities: string[];
  coordinates?: { latitude?: number; longitude?: number };
  isActive: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isAvailable: boolean;
  goldenVisaEligible?: boolean;
}

function toProjectDetail(
  doc: HouseValidationSchema & { _id: unknown },
): ProjectDetail {
  return {
    id: String(doc._id),
    name: doc.name,
    summary: doc.summary,
    description: doc.description,
    city: doc.city,
    state: doc.state,
    address: doc.address,
    propertyType: doc.propertyType,
    carpetArea: doc.carpetArea,
    bedrooms: doc.bedrooms,
    bathrooms: doc.bathrooms,
    balconies: doc.balconies,
    floors: doc.floors,
    propertyOnFloor: doc.propertyOnFloor,
    furnishing: doc.furnishing,
    constructionYear: doc.constructionYear,
    utilities: doc.utilities ?? [],
    leaseTerm: doc.leaseTerm,
    depositAmount: doc.depositAmount,
    price: doc.price,
    images: doc.images ?? [],
    video: doc.video,
    amenities: doc.amenities ?? [],
    coordinates: doc.coordinates,
    isActive: doc.isActive,
    isVerified: doc.isVerified,
    isFeatured: doc.isFeatured,
    isNew: doc.isNew,
    isAvailable: doc.isAvailable,
    goldenVisaEligible: doc.goldenVisaEligible,
  };
}

function buildListingBadges(project: ProjectDetail) {
  const badges: { id: string; label: string }[] = [];
  if (project.isActive) {
    badges.push({ id: "active", label: "Active listing" });
  }
  if (project.isFeatured) {
    badges.push({ id: "featured", label: "Featured property" });
  }
  if (project.isVerified) {
    badges.push({ id: "verified", label: "Verified property" });
  }
  if (project.isNew) {
    badges.push({ id: "new", label: "New property" });
  }
  if (project.isAvailable) {
    badges.push({ id: "available", label: "Available for rent" });
  }
  if (isGoldenVisaEligible(project.goldenVisaEligible)) {
    badges.push({ id: "golden-visa", label: "Golden Visa Eligible" });
  }
  return badges;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  await connectDb();
  const doc = await House.findById(id).lean<
    (HouseValidationSchema & { _id: unknown }) | null
  >();

  if (!doc) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-600">Project not found.</p>
      </main>
    );
  }

  const project = toProjectDetail(doc);
  const mainImage = project.images[0] ?? "/property.jpeg";
  const priceRangeLabel = formatEurAmount(project.price);
  const listingBadges = buildListingBadges(project);
  const floorStatusLabel = formatFloorStatus(
    project.floors,
    project.propertyOnFloor,
  );
  const furnishingLabel = formatDashCaseLabel(project.furnishing);

  const highlights = [
    {
      icon: "bed" as const,
      title: `${project.bedrooms} Bedrooms`,
      subtitle: `${project.bathrooms} Bathrooms · ready to live`,
    },
    {
      icon: "building" as const,
      title: `${project.carpetArea.toLocaleString()} SQFT`,
      subtitle: formatDashCaseLabel(project.propertyType),
    },
    {
      icon: "star" as const,
      title:
        project.amenities.length > 0
          ? `${project.amenities.length} Premium Amenities`
          : "Premium Amenities",
      subtitle:
        project.amenities.length > 0
          ? "Luxury finishes & lifestyle extras"
          : "Quality interiors throughout",
    },
    {
      icon: "shield" as const,
      title: isGoldenVisaEligible(project.goldenVisaEligible)
        ? "Investment Potential"
        : project.isVerified
          ? "Verified Listing"
          : "Investment Ready",
      subtitle: isGoldenVisaEligible(project.goldenVisaEligible)
        ? "Golden Visa eligible property"
        : "Reviewed by HousingSaga",
    },
  ];

  return (
    <main className="bg-white min-h-screen pb-12">
      <ProjectsDetailHero
        title={project.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      />

      <ProjectMediaSummary
        mainImage={mainImage}
        name={project.name}
        summary={project.summary}
        city={project.city}
        state={project.state}
        projectType={formatDashCaseLabel(project.propertyType)}
        areaSqft={project.carpetArea}
        constructionYear={project.constructionYear}
        priceRangeLabel={priceRangeLabel}
        goldenVisaEligible={project.goldenVisaEligible}
        listingBadges={listingBadges}
      />

      {/* About + sidebar — matches attached design (no % split) */}
      <section className="relative mt-8 sm:mt-10 overflow-hidden bg-[#fbfcfa]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_rgba(190,242,100,0.18),_transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-14">
            <div className="min-w-0 flex-1">
              <ProjectAbout
                title={project.name}
                description={project.description}
                summary={project.summary}
                highlights={highlights}
              />
            </div>

            <aside className="w-full lg:w-[380px] xl:w-[400px] shrink-0 space-y-5">
              <ProjectKeyFeatures
                bedrooms={project.bedrooms}
                bathrooms={project.bathrooms}
                areaSqft={project.carpetArea}
                hasAmenities={project.amenities.length > 0}
              />
              <ProjectContactAgent />
              <ProjectPropertyDetails
                furnishingLabel={furnishingLabel}
                floorStatusLabel={floorStatusLabel}
                leaseTerm={project.leaseTerm}
                depositAmount={project.depositAmount}
              />
            </aside>
          </div>
        </div>
      </section>

      <ProjectAmenities amenities={project.amenities} />
      <ProjectUtilities utilities={project.utilities} />

      <ProjectInteriorTabs
        photos={project.images}
        videoUrl={project.video}
        floorPlanImages={project.images.slice(1, 4)}
      />

      <ProjectMapSection
        latitude={project.coordinates?.latitude}
        longitude={project.coordinates?.longitude}
        areaLabel={[project.city, project.state].filter(Boolean).join(", ")}
        address={
          !project.coordinates?.latitude
            ? [project.city, project.state].filter(Boolean).join(", ") ||
              undefined
            : undefined
        }
      />
    </main>
  );
}
