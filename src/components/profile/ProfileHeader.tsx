import Image from "next/image";
import {
  RiCalendarLine,
  RiEdit2Line,
  RiMailLine,
  RiPhoneLine,
  RiShieldCheckLine,
  RiUser3Line,
} from "react-icons/ri";


type UserRole = "owner" | "buyer" | "admin" | null;

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: UserRole;
  phone?: string | null;
  memberSince?: string;
  profilePic?: string | null;
}

const roleConfig: Record<
  Exclude<UserRole, null>,
  { label: string; classes: string; dot: string }
> = {
  owner: {
    label: "Property Owner",
    classes:
      "bg-lime-50 text-lime-700 ring-1 ring-lime-200 dark:bg-lime-500/10 dark:text-lime-400 dark:ring-lime-500/25",
    dot: "bg-lime-500",
  },
  buyer: {
    label: "Home Buyer",
    classes:
      "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/25",
    dot: "bg-sky-500",
  },
  admin: {
    label: "Administrator",
    classes:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/25",
    dot: "bg-amber-500",
  },
};

export default function ProfileHeader({
  name,
  email,
  role,
  phone,
  memberSince,
  profilePic,
}: ProfileHeaderProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0].toUpperCase())
    .slice(0, 2)
    .join("");

  const config = role ? roleConfig[role] : null;

  return (
    <section className="py-8 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.9fr] lg:items-end">
        <div>
          <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-4">
            Personal Dashboard
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
              Welcome back, {name}
            </h1>
            {config && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.classes}`}
              >
                <RiShieldCheckLine className="h-3.5 w-3.5" />
                {config.label}
              </span>
            )}
            
          </div>

          <p className="max-w-2xl text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Track your account, manage your activity, and keep your property
            journey aligned with the premium HousingSaga experience.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/6 px-3.5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <RiMailLine className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              {email}
            </span>
            {phone && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/6 px-3.5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <RiPhoneLine className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                {phone}
              </span>
            )}
            {memberSince && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/6 px-3.5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <RiCalendarLine className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                Member since {memberSince}
              </span>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-[#f7f6f3] p-6 shadow-sm dark:border-white/8 dark:bg-[#13161f]">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-lime-300/20 blur-3xl dark:bg-lime-400/10" />
          <div className="relative flex items-start gap-5">
            <div className="relative shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-gradient-to-br from-lime-400 to-lime-600 text-white shadow-lg flex items-center justify-center text-2xl font-semibold">
                {profilePic ? (
                  <Image
                    src={profilePic}
                    alt={name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : initials ? (
                  <span className="tracking-tight">{initials}</span>
                ) : (
                  <RiUser3Line className="h-10 w-10" />
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-lime-400 ring-2 ring-[#f7f6f3] dark:ring-[#13161f]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Account Snapshot
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {name}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {role ? `${config?.label ?? "Member"} account` : "Complete your onboarding to unlock all profile features."}
              </p>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-4 py-3 dark:border-white/8 dark:bg-white/5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    Profile status
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    Ready to manage
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm">
                  <RiEdit2Line className="h-4 w-4" />
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
