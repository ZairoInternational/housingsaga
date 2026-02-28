import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authConfig";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import type { Session } from "next-auth";

export const metadata = {
  title: "Complete Your Setup - Housing Saga",
  description: "Set up your account on Housing Saga",
};

interface OnboardingSession extends Session {
  user?: Session['user'] & {
    id?: string;
    onboarded?: boolean;
  };
}

export default async function OnboardingPage() {
  // Get session
  const session = (await getServerSession(authOptions)) as OnboardingSession | null;

  // Redirect to login if not authenticated
  if (!session || !session.user?.id) {
    redirect("/sign-in");
  }

  // Redirect to home if already onboarded
  if (session.user?.onboarded) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Card Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
          <OnboardingForm />
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Housing Saga • Real Estate Made Simple
          </p>
        </div>
      </div>
    </div>
  );
}
