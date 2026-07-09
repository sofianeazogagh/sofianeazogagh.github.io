import Link from "next/link";
import Hero from "@/components/Hero";
import Publications from "@/components/Publications";
import Teaching from "@/components/Teaching";
import Talks from "@/components/Talks";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-24 mt-20">
        <Reveal>
          <section>
            <SectionHeading id="publications" eyebrow="Research" title="Publications" />
            <Publications />
          </section>
        </Reveal>

        <Reveal>
          <section>
            <SectionHeading id="teaching" eyebrow="Education" title="Teaching" />
            <Teaching />
          </section>
        </Reveal>

        <Reveal>
          <section>
            <SectionHeading id="talks" eyebrow="Presentations" title="Talks & Posters" />
            <Talks />
          </section>
        </Reveal>

        <Reveal>
          <section>
            <SectionHeading id="blog" eyebrow="Writing" title="Latest from the Blog" />
            {posts.length === 0 ? (
              <p className="text-zinc-500 dark:text-zinc-400">No posts yet — coming soon.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-night-soft p-5 transition-all hover:border-accent-300 dark:hover:border-accent-700 hover:shadow-lg hover:shadow-accent-100/50 dark:hover:shadow-none hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">{formatDate(post.date)}</p>
                    <h3 className="font-display text-lg font-semibold leading-snug mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/blog/"
              className="inline-block mt-6 text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline underline-offset-4"
            >
              All posts →
            </Link>
          </section>
        </Reveal>
      </div>
    </>
  );
}
