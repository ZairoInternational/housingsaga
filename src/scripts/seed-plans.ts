import { connectDb } from "@/lib/db";
import { Plan } from "@/models/plan";

async function main() {
  await connectDb();

  const planSlug = "property-listing";

  await Plan.findOneAndUpdate(
    { slug: planSlug },
    {
      $set: {
        slug: planSlug,
        name: "Property Listing Fee",
        description: "One-time fee to list a property on HousingSaga.",
        amountEuro: 200,
        currency: "EUR",
        isActive: true,
        features: [
          "Property onboarding and verification",
          "Professional positioning for international investors",
          "Exposure to a network of serious Golden Visa and global buyers",
        ],
      },
    },
    { upsert: true, new: true },
  );

  console.log(`[seed-plans] Upserted plan: ${planSlug}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("[seed-plans] Failed:", err);
    process.exit(1);
  });

