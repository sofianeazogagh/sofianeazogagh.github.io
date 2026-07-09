import talks from "@content/talks.json";
import { richText } from "@/lib/richText";
import { SlidesIcon, PosterIcon, PdfIcon, LocationIcon } from "./Icons";

export default function Talks() {
  // Group chronologically, newest year first (data can stay unordered)
  const years = [...new Set(talks.map((t) => t.year))].sort((a, b) => b - a);

  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden />

      <div className="space-y-10">
        {years.map((year) => (
          <div key={year} className="relative pl-9">
            <span
              className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-accent-500 ring-4 ring-accent-100 dark:ring-accent-900/50"
              aria-hidden
            />
            <p className="text-sm font-mono font-semibold text-accent-600 dark:text-accent-400 mb-3">{year}</p>

            <div className="space-y-3">
              {talks
                .filter((t) => t.year === year)
                .map((talk) => (
                  <div
                    key={`${talk.title}-${talk.type}-${talk.event}`}
                    className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-night-soft p-4 transition-all hover:border-accent-300 dark:hover:border-accent-700 hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md ${
                              talk.type === "talk"
                                ? "bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300"
                                : "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                            }`}
                          >
                            {talk.type === "talk" ? <SlidesIcon className="w-3 h-3" /> : <PosterIcon className="w-3 h-3" />}
                            {talk.type === "talk" ? "Talk" : "Poster"}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">{richText(talk.event)}</span>
                        </div>
                        {"location" in talk && talk.location && (
                          <p className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                            <LocationIcon className="w-3 h-3 shrink-0" />
                            {talk.location}
                          </p>
                        )}
                        <h3 className="font-medium text-[0.95rem] leading-snug">{talk.title}</h3>
                      </div>
                      {"file" in talk && talk.file && (
                        <a
                          href={talk.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
                        >
                          <PdfIcon />
                          {talk.type === "talk" ? "Slides" : "Poster"}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
