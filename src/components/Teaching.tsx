import teaching from "@content/teaching.json";

export default function Teaching() {
  return (
    <div className="relative">
      {/* Timeline spine */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden />

      <div className="space-y-10">
        {teaching.map((entry) => (
          <div key={entry.period} className="relative pl-9">
            {/* Timeline dot */}
            <span
              className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-accent-500 ring-4 ring-accent-100 dark:ring-accent-900/50"
              aria-hidden
            />
            <p className="text-sm font-mono font-semibold text-accent-600 dark:text-accent-400 mb-1">
              {entry.period}
            </p>
            <h3 className="font-display text-lg font-semibold">
              {entry.role}
              <span className="font-sans text-sm font-normal text-zinc-500 dark:text-zinc-400"> · {entry.institution}</span>
            </h3>
            <ul className="mt-3 space-y-2">
              {entry.courses.map((course) => (
                <li
                  key={`${course.code}-${course.duty}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[0.95rem]"
                >
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {course.name}{" "}
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-accent-600 dark:text-accent-400 hover:underline underline-offset-4"
                    >
                      ({course.code})
                    </a>
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">
                    {course.duty} · {course.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
