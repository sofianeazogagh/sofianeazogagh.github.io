export default function SectionHeading({
  id,
  eyebrow,
  title,
}: {
  id?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
