import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { House } from "../../../models/houseModel";
import { HousingUsers } from "@/models/housingUser";
import ProfileShell from "@/components/profile/ProfileShell";
import ProfileHeader from "@/components/profile/ProfileHeader";
import OwnerSummaryCards from "@/components/profile/OwnerSummaryCards";
import BuyerSummaryCards from "@/components/profile/BuyerSummaryCards";
import OwnerActions from "@/components/profile/OwnerActions";
import BuyerActions from "@/components/profile/BuyerActions";
import OwnerListingsPreview from "@/components/profile/OwnerListingsPreview";
import ProfileNotifications, {
  type ProfileNotificationItem,
} from "@/components/profile/ProfileNotifications";
import ProfileSectionReveal from "@/components/profile/ProfileSectionReveal";

type UserRole = "owner" | "buyer" | "admin" | null;

interface ProfileUser {
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  profilePic?: string | null;
  createdAt?: Date | string;
  subscriptionPlan?: string | null;
  paymentStatus?: "active" | "inactive" | null;
}

interface ProfileHouse {
  _id: { toString(): string };
  name: string;
  address: string;
  city: string;
  state: string;
  propertyType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images?: string[];
  isActive: boolean;
  isVerified: boolean;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user ||
    !("id" in session.user) ||
    !session.user.id
  ) {
    redirect("/sign-in?redirect=/profile");
  }

  const role = (session as { role?: UserRole }).role ?? null;
  const userId = (session.user as { id?: string }).id;

  if (!userId) {
    redirect("/sign-in?redirect=/profile");
  }

  await connectDb();

  const dbUser = await HousingUsers.findById(userId).lean<ProfileUser | null>();

  if (!dbUser) {
    redirect("/sign-in?redirect=/profile");
  }

  const effectiveRole: UserRole = dbUser.role ?? role ?? null;
  const isOwner = effectiveRole === "owner";
  const isBuyer = effectiveRole === "buyer";
  // Listing access is controlled per-address at submit-time.
  const canListProperties = isOwner;

  const ownerListings = isOwner
    ? await House.find({ owner: userId })
        .sort({ createdAt: -1 })
        .select({
          name: 1,
          address: 1,
          city: 1,
          state: 1,
          propertyType: 1,
          price: 1,
          bedrooms: 1,
          bathrooms: 1,
          images: 1,
          isActive: 1,
          isVerified: 1,
        })
        .lean<ProfileHouse[]>()
    : [];

  const totalListings = ownerListings.length;
  const activeListings = ownerListings.filter(
    (listing) => listing.isActive,
  ).length;
  const pendingListings = ownerListings.filter(
    (listing) => !listing.isVerified,
  ).length;

  const notifications: ProfileNotificationItem[] = isOwner
    ? [
        {
          id: "owner-activity",
          title: `${activeListings} listing${activeListings === 1 ? "" : "s"} active`,
          description:
            activeListings > 0
              ? "Your active properties are live and visible to buyers across the platform."
              : "You do not have any active listings yet. Publish a property to start attracting buyer interest.",
          timeLabel: "Updated just now",
          tone: "success",
        },
        {
          id: "owner-review",
          title:
            pendingListings > 0
              ? `${pendingListings} listing${pendingListings === 1 ? "" : "s"} awaiting review`
              : "All listings reviewed",
          description:
            pendingListings > 0
              ? "Some of your submissions are still pending verification before they are fully promoted."
              : "Your submitted listings have cleared review and are ready for discovery.",
          timeLabel: "Review queue",
          tone: pendingListings > 0 ? "warning" : "info",
        },
        {
          id: "owner-guidance",
          title: "Profile visibility boost",
          description:
            "Add sharper photos and complete property details to increase trust and improve inquiry quality.",
          timeLabel: "HousingSaga insight",
          tone: "info",
        },
      ]
    : [
        {
          id: "buyer-recommendation",
          title: "Fresh homes are waiting",
          description:
            "Browse newly listed properties curated around the preferences you have started shaping.",
          timeLabel: "Today",
          tone: "info",
        },
        {
          id: "buyer-account",
          title: "Complete your buyer profile",
          description:
            "A richer profile helps us deliver more relevant homes, smoother support, and better alerts.",
          timeLabel: "Account reminder",
          tone: "warning",
        },
        {
          id: "buyer-support",
          title: "Need expert guidance?",
          description:
            "Our team can help shortlist homes, refine your budget, and simplify your next decision.",
          timeLabel: "Support is available",
          tone: "success",
        },
      ];

  const memberSince =
    dbUser.createdAt instanceof Date
      ? dbUser.createdAt
      : dbUser.createdAt
        ? new Date(dbUser.createdAt)
        : undefined;

  const memberSinceLabel =
    memberSince &&
    memberSince.toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });

  return (
    <ProfileShell>
      <ProfileSectionReveal>
        <ProfileHeader
          name={dbUser.name}
          email={dbUser.email}
          role={effectiveRole}
          phone={dbUser.phone}
          memberSince={memberSinceLabel}
          profilePic={dbUser.profilePic}
        />
      </ProfileSectionReveal>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.7fr)_360px] gap-8 items-start">
        <div>
          {isOwner && (
            <>
              <ProfileSectionReveal delay={0.05}>
                <OwnerSummaryCards
                  totalListings={totalListings}
                  activeListings={activeListings}
                  pendingListings={pendingListings}
                />
              </ProfileSectionReveal>
              <ProfileSectionReveal delay={0.1}>
                <OwnerListingsPreview
                  listings={ownerListings.map((listing) => ({
                    id: listing._id.toString(),
                    name: listing.name,
                    address: listing.address,
                    city: listing.city,
                    state: listing.state,
                    propertyType: listing.propertyType,
                    price: listing.price,
                    bedrooms: listing.bedrooms,
                    bathrooms: listing.bathrooms,
                    image: listing.images?.[0],
                    isActive: listing.isActive,
                    isVerified: listing.isVerified,
                  }))}
                />
              </ProfileSectionReveal>
              <ProfileSectionReveal delay={0.15}>
                <OwnerActions canListProperties={canListProperties} />
              </ProfileSectionReveal>
            </>
          )}

          {isBuyer && (
            <>
              <ProfileSectionReveal delay={0.05}>
                <BuyerSummaryCards />
              </ProfileSectionReveal>
              <ProfileSectionReveal delay={0.1}>
                <BuyerActions />
              </ProfileSectionReveal>
            </>
          )}

          {!isOwner && !isBuyer && (
            <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
              Your role is not yet set. Complete onboarding to unlock a personalized
              profile experience.
            </p>
          )}
        </div>

        {(isOwner || isBuyer) && (
          <div className="xl:sticky xl:top-28">
            <ProfileSectionReveal delay={0.12}>
              <ProfileNotifications items={notifications} />
            </ProfileSectionReveal>
          </div>
        )}
      </div>
    </ProfileShell>
  );
}
