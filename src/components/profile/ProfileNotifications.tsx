import {
  RiCheckboxCircleLine,
  RiNotification3Line,
  RiSparklingLine,
  RiTimeLine,
} from "react-icons/ri";

type NotificationTone = "success" | "info" | "warning";

export interface ProfileNotificationItem {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  tone: NotificationTone;
}

interface ProfileNotificationsProps {
  items: ProfileNotificationItem[];
}

const toneConfig: Record<
  NotificationTone,
  {
    icon: typeof RiNotification3Line;
    badge: string;
    iconWrap: string;
    iconClass: string;
  }
> = {
  success: {
    icon: RiCheckboxCircleLine,
    badge: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10",
    iconWrap: "bg-emerald-100 dark:bg-emerald-500/15",
    iconClass: "text-emerald-700 dark:text-emerald-400",
  },
  info: {
    icon: RiSparklingLine,
    badge: "text-sky-700 bg-sky-50 dark:text-sky-400 dark:bg-sky-500/10",
    iconWrap: "bg-sky-100 dark:bg-sky-500/15",
    iconClass: "text-sky-700 dark:text-sky-400",
  },
  warning: {
    icon: RiTimeLine,
    badge: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10",
    iconWrap: "bg-amber-100 dark:bg-amber-500/15",
    iconClass: "text-amber-700 dark:text-amber-400",
  },
};

export default function ProfileNotifications({
  items,
}: ProfileNotificationsProps) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-[#f7f6f3] p-6 shadow-sm dark:border-white/8 dark:bg-[#13161f]">
      <div className="mb-6">
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-3">
          Notifications
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          What needs your attention
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Stay in sync with listing activity, recommendations, and account
          updates.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const config = toneConfig[item.tone];
          const Icon = config.icon;

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm dark:border-white/8 dark:bg-[#0f0f0f]"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${config.iconWrap}`}
                >
                  <Icon className={`h-5 w-5 ${config.iconClass}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${config.badge}`}
                    >
                      {item.tone}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-gray-400 dark:text-gray-500">
                    {item.timeLabel}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

