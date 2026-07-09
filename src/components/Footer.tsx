import profile from "@content/profile.json";
import { GitHubIcon, LinkedInIcon, MailIcon, ScholarIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
          <a href={profile.social.github} aria-label="GitHub" className="hover:text-accent-600 dark:hover:text-accent-300 transition-colors">
            <GitHubIcon />
          </a>
          <a href={profile.social.linkedin} aria-label="LinkedIn" className="hover:text-accent-600 dark:hover:text-accent-300 transition-colors">
            <LinkedInIcon />
          </a>
          <a href={profile.social.scholar} aria-label="Google Scholar" className="hover:text-accent-600 dark:hover:text-accent-300 transition-colors">
            <ScholarIcon />
          </a>
          <a href={`mailto:${profile.social.email}`} aria-label="Email" className="hover:text-accent-600 dark:hover:text-accent-300 transition-colors">
            <MailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
