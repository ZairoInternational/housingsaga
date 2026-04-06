import ProjectsDetailHero from "@/components/projects/ProjectsDetailHero";
import ProjectMediaSummary from "@/components/projects/ProjectMediaSummary";
import ProjectAbout from "@/components/projects/ProjectAbout";
import ProjectKeyFeatures from "@/components/projects/ProjectKeyFeatures";
import ProjectPropertyDetails from "@/components/projects/ProjectPropertyDetails";
import ProjectAmenities from "@/components/projects/ProjectAmenities";
import ProjectUtilities from "@/components/projects/ProjectUtilities";
import ProjectInteriorTabs from "@/components/projects/ProjectInteriorTabs";
import ProjectMapSection from "@/components/projects/ProjectMapSection";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";
import type { HouseValidationSchema } from "@/schemas/property.schema";
import { formatEurAmount } from "@/lib/format-currency";
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
        listingBadges={listingBadges}
      />

      <section className="mt-10 sm:mt-12">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
          <ProjectAbout
            sections={[
              { title: "About this property", body: project.description },
            ]}
          />
          <div className="space-y-4">
            <ProjectKeyFeatures
              bedrooms={project.bedrooms}
              bathrooms={project.bathrooms}
              balconies={project.balconies}
              areaSqft={project.carpetArea}
            />
            <ProjectPropertyDetails
              furnishingLabel={furnishingLabel}
              floorStatusLabel={floorStatusLabel}
              leaseTerm={project.leaseTerm}
              depositAmount={project.depositAmount}
            />
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
        address={project.address}
      />
    </main>
  );
}
