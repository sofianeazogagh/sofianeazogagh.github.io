import Image from "next/image";
import profile from "@content/profile.json";
import { richText } from "@/lib/richText";
import { GitHubIcon, LinkedInIcon, MailIcon, ScholarIcon, LocationIcon } from "./Icons";

const socialLinks = [
  { href: profile.social.github, label: "GitHub", icon: GitHubIcon },
  { href: profile.social.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: profile.social.scholar, label: "Scholar", icon: ScholarIcon },
  { href: `mailto:${profile.social.email}`, label: "Email", icon: MailIcon },
];

export default function Hero() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Photo + quick facts */}
          <div className="flex flex-col items-center md:items-start gap-5 shrink-0 mx-auto md:mx-0 animate-fade-up">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-accent-400 to-accent-700 opacity-70 blur-lg dark:opacity-40" />
              <Image
                src="/profile.jpg"
                alt={profile.name}
                width={200}
                height={200}
                priority
                className="relative rounded-3xl object-cover w-44 h-44 sm:w-52 sm:h-52 border-4 border-paper dark:border-night"
              />
            </div>
            <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <LocationIcon className="w-4 h-4 text-accent-500" />
              {profile.location}
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-accent-600 hover:border-accent-300 hover:bg-accent-50 dark:hover:text-accent-300 dark:hover:border-accent-700 dark:hover:bg-zinc-800 transition-all hover:-translate-y-0.5"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Intro */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400 mb-3">
              {profile.title} · {profile.affiliation}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
              {profile.name}
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6">{profile.tagline}</p>
            {profile.about.map((paragraph, i) => (
              <p key={i} className="text-[1.05rem] leading-relaxed text-zinc-700 dark:text-zinc-300 mb-4">
                {richText(paragraph)}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 mt-6">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 text-sm font-medium rounded-full bg-accent-50 text-accent-800 border border-accent-200 dark:bg-accent-900/30 dark:text-accent-200 dark:border-accent-800"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
