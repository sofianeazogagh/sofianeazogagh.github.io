"use client";

import { useMemo, useState } from "react";
import publications from "@content/publications.json";
import {
  PdfIcon,
  GitHubIcon,
  QuoteIcon,
  AwardIcon,
  SearchIcon,
  CopyIcon,
  CheckIcon,
} from "./Icons";

interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueUrl?: string;
  year: number;
  status: string;
  tags: string[];
  pdf: string | null;
  github: string | null;
  bibtex: string | null;
  award: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  "under-review": "Under review",
  preprint: "Preprint",
  thesis: "Thesis",
};

function AuthorList({ authors }: { authors: string[] }) {
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      {authors.map((author, i) => (
        <span key={author}>
          <span className={author === "Sofiane Azogagh" ? "font-semibold text-zinc-800 dark:text-zinc-200" : ""}>
            {author}
          </span>
          {i < authors.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

function PublicationCard({ pub }: { pub: Publication }) {
  const [showBibtex, setShowBibtex] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyBibtex() {
    if (!pub.bibtex) return;
    navigator.clipboard.writeText(pub.bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const statusLabel = STATUS_LABELS[pub.status];

  return (
    <article className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-night-soft p-5 sm:p-6 transition-all hover:border-accent-300 dark:hover:border-accent-700 hover:shadow-lg hover:shadow-accent-100/50 dark:hover:shadow-none hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center gap-2 mb-2.5">
        <span className="text-xs font-semibold font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {pub.year}
        </span>
        {statusLabel && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
            {statusLabel}
          </span>
        )}
        {pub.award && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-100 to-yellow-50 text-amber-800 border border-amber-300 dark:from-amber-900/40 dark:to-amber-900/20 dark:text-amber-300 dark:border-amber-700">
            <AwardIcon className="w-3.5 h-3.5" />
            {pub.award}
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors">
        {pub.title}
      </h3>

      <AuthorList authors={pub.authors} />

      {/* Skip the venue line when it would just repeat the status badge */}
      {pub.venue.toLowerCase() !== statusLabel?.toLowerCase() && (
      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1.5">
        {pub.venueUrl ? (
          <a
            href={pub.venueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-600 dark:hover:text-accent-400 underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4"
          >
            {pub.venue}
          </a>
        ) : (
          pub.venue
        )}
      </p>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-4">
        {pub.pdf && (
          <a
            href={pub.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-accent-600 text-white hover:bg-accent-700 transition-colors"
          >
            <PdfIcon /> PDF
          </a>
        )}
        {pub.github && (
          <a
            href={pub.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
          >
            <GitHubIcon className="w-4 h-4" /> Code
          </a>
        )}
        {pub.bibtex && (
          <button
            onClick={() => setShowBibtex(!showBibtex)}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors cursor-pointer"
            aria-expanded={showBibtex}
          >
            <QuoteIcon /> BibTeX
          </button>
        )}
      </div>

      {showBibtex && pub.bibtex && (
        <div className="relative mt-4 animate-fade-up">
          <pre className="text-xs font-mono leading-relaxed bg-zinc-50 dark:bg-night border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 pr-14 overflow-x-auto text-zinc-700 dark:text-zinc-300">
            {pub.bibtex}
          </pre>
          <button
            onClick={copyBibtex}
            title="Copy to clipboard"
            aria-label="Copy BibTeX to clipboard"
            className="absolute top-3 right-3 p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-accent-600 dark:text-zinc-400 dark:hover:text-accent-300 transition-colors cursor-pointer"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <CopyIcon />}
          </button>
        </div>
      )}
    </article>
  );
}

export default function Publications() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return publications as Publication[];
    return (publications as Publication[]).filter((pub) =>
      [pub.title, pub.venue, String(pub.year), ...pub.authors, ...pub.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, venue, or topic…"
          aria-label="Search publications"
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-night-soft placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400 transition-shadow"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 py-8 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl">
          No publications match “{query}”.
        </p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      )}
    </div>
  );
}
