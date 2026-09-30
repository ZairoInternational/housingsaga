export default function AccountPageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="py-8 md:py-10">
      <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-3">
        {eyebrow}
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-500 dark:text-gray-400 leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
}
