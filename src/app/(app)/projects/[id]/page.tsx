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
import { getLocale, getTranslations } from "next-intl/server";

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
  isSold?: boolean;
  goldenVisaEligible?: boolean;
}

function toProjectDetail(
  doc: HouseValidationSchema & { _id: unknown; isSold?: boolean },
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
    isSold: doc.isSold === true,
    goldenVisaEligible: doc.goldenVisaEligible,
  };
}

function buildListingBadges(
  project: ProjectDetail,
  label: (key: string) => string,
) {
  const badges: { id: string; label: string }[] = [];
  if (project.isSold) {
    badges.push({ id: "sold", label: label("sold") });
  } else if (project.isActive) {
    badges.push({ id: "active", label: label("activeListing") });
  }
  if (project.isFeatured) {
    badges.push({ id: "featured", label: label("featuredProperty") });
  }
  if (project.isVerified) {
    badges.push({ id: "verified", label: label("verifiedProperty") });
  }
  if (project.isNew) {
    badges.push({ id: "new", label: label("newProperty") });
  }
  if (!project.isSold && project.isAvailable) {
    badges.push({ id: "available", label: label("availableForRent") });
  }
  if (isGoldenVisaEligible(project.goldenVisaEligible)) {
    badges.push({ id: "golden-visa", label: label("goldenVisaBadge") });
  }
  return badges;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  await connectDb();
  const doc = await House.findById(id).lean<
    (HouseValidationSchema & { _id: unknown; isSold?: boolean }) | null
  >();

  const locale = await getLocale();
  const t = await getTranslations("property");
  const numberLocale = locale === "el" ? "el-GR" : "en-US";

  if (!doc) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-600">{t("notFound")}</p>
      </main>
    );
  }

  const project = toProjectDetail(doc);
  const mainImage = project.images[0] ?? "/property.jpeg";
  const priceRangeLabel = formatEurAmount(project.price);
  const listingBadges = buildListingBadges(project, (key) => t(key));
  const floorStatusLabel = formatFloorStatus(
    project.floors,
    project.propertyOnFloor,
    locale === "el" ? "el" : "en",
  );
  const furnishingLabel = t(`furnishingValues.${project.furnishing}`);
  const propertyTypeLabel = t(`types.${project.propertyType}`);

  const highlights = [
    {
      icon: "bed" as const,
      title: t("bedrooms", { count: project.bedrooms }),
      subtitle: t("bathroomsReady", { count: project.bathrooms }),
    },
    {
      icon: "building" as const,
      title: t("sqft", { area: project.carpetArea.toLocaleString(numberLocale) }),
      subtitle: propertyTypeLabel,
    },
    {
      icon: "star" as const,
      title:
        project.amenities.length > 0
          ? t("amenityCount", { count: project.amenities.length })
          : t("premiumAmenities"),
      subtitle:
        project.amenities.length > 0
          ? t("amenitySubtitle")
          : t("qualityInteriors"),
    },
    {
      icon: "shield" as const,
      title: isGoldenVisaEligible(project.goldenVisaEligible)
        ? t("investmentPotential")
        : project.isVerified
          ? t("verifiedListing")
          : t("investmentReady"),
      subtitle: isGoldenVisaEligible(project.goldenVisaEligible)
        ? t("goldenVisaEligible")
        : t("reviewed"),
    },
  ];

  return (
    <main className="bg-white min-h-screen pb-12">
      <ProjectsDetailHero
        title={project.name}
        breadcrumbs={[
          { label: t("home"), href: "/" },
          { label: t("projects"), href: "/projects" },
          { label: project.name },
        ]}
      />

      <ProjectMediaSummary
        mainImage={mainImage}
        name={project.name}
        summary={project.summary}
        city={project.city}
        state={project.state}
        projectType={propertyTypeLabel}
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
