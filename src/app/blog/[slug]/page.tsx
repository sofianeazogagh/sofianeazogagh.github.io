import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: `${post.title} — Sofiane Azogagh`, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-16">
      <Link
        href="/blog/"
        className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline underline-offset-4"
      >
        ← All posts
      </Link>

      <header className="mt-6 mb-10">
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-3">{formatDate(post.date)}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
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
      </header>

      <div className="prose-blog" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
