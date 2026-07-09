import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Blog — Sofiane Azogagh",
  description: "Notes on cryptography, homomorphic encryption, and privacy-preserving machine learning.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-16">
      <SectionHeading eyebrow="Writing" title="Blog" />

      {posts.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400">No posts yet — coming soon.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-night-soft p-6 transition-all hover:border-accent-300 dark:hover:border-accent-700 hover:shadow-lg hover:shadow-accent-100/50 dark:hover:shadow-none hover:-translate-y-0.5"
            >
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">{formatDate(post.date)}</p>
              <h2 className="font-display text-xl font-semibold leading-snug mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-[0.95rem] text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
