import ProjectsDetailHero from "@/components/projects/ProjectsDetailHero";
import ProjectMediaSummary from "@/components/projects/ProjectMediaSummary";
import ProjectAbout from "@/components/projects/ProjectAbout";
import ProjectKeyFeatures from "@/components/projects/ProjectKeyFeatures";
import ProjectAmenities from "@/components/projects/ProjectAmenities";
import ProjectInteriorTabs from "@/components/projects/ProjectInteriorTabs";
import ProjectMapSection from "@/components/projects/ProjectMapSection";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";
import type { HouseValidationSchema } from "@/schemas/property.schema";
import { formatEurAmount } from "@/lib/format-currency";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  address: string;
  propertyType: string;
  carpetArea: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  price: number;
  images: string[];
  video?: string;
  amenities: string[];
  coordinates?: { latitude?: number; longitude?: number };
}

function toProjectDetail(
  doc: HouseValidationSchema & { _id: unknown },
): ProjectDetail {
  return {
    id: String(doc._id),
    name: doc.name,
    description: doc.description,
    city: doc.city,
    state: doc.state,
    address: doc.address,
    propertyType: doc.propertyType,
    carpetArea: doc.carpetArea,
    bedrooms: doc.bedrooms,
    bathrooms: doc.bathrooms,
    balconies: doc.balconies,
    price: doc.price,
    images: doc.images ?? [],
    video: doc.video,
    amenities: doc.amenities ?? [],
    coordinates: doc.coordinates,
  };
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

  const aboutBullets: string[] = [
    "Compact Design: Fits perfectly into any room or workspace.",
    "Smart Sensing: Automatically adjusts settings based on air quality.",
    "Child Safe: Features a secure, tamper-proof locking mechanism.",
    "Eco Mode: Conserves energy without compromising effectiveness.",
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
        city={project.city}
        state={project.state}
        projectType={project.propertyType}
        areaSqft={project.carpetArea}
        startDateLabel="November 12, 2020"
        priceRangeLabel={priceRangeLabel}
      />

      <section className="mt-10 sm:mt-12">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
          <ProjectAbout
            description={project.description}
            bulletPoints={aboutBullets}
          />
          <ProjectKeyFeatures
            bedrooms={project.bedrooms}
            bathrooms={project.bathrooms}
            parking={project.balconies}
            areaSqft={project.carpetArea}
          />
        </div>
      </section>

      <ProjectAmenities amenities={project.amenities} />

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
