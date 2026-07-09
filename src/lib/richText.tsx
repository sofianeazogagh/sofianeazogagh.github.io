// Renders minimal markdown from content JSON ([text](url)) as real links
export function richText(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-600 dark:text-accent-400 font-medium underline decoration-accent-300 dark:decoration-accent-700 underline-offset-4 hover:decoration-2"
        >
          {match[1]}
        </a>
      );
    }
    return part;
  });
}
