import { asString, parseFrontmatter, type FrontmatterValue } from './frontmatter';

export interface BlogPost {
  /** URL slug — from frontmatter, else derived from the filename. */
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) — from frontmatter, else the filename prefix. */
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  /** Raw markdown body, frontmatter stripped. */
  content: string;
  draft: boolean;
  /** Authorship badge shown on the article page. Omitted entirely if unset. */
  authorship?: 'ai-coauthored' | 'self-written';
}

/**
 * Every `.md` file in src/content/blog is a post. Adding a file is all it takes
 * to publish one — Vite inlines the raw source at build time, so there is no
 * fetch at runtime and no generation step.
 */
const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FILENAME_RE = /(?:^|\/)(?:(\d{4}-\d{2}-\d{2})-)?([^/]+)\.md$/;

const WORDS_PER_MINUTE = 210;

/** Strips markdown syntax well enough to get an honest word count. */
function estimateReadTime(markdown: string): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ');

  const words = plain.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function toPost(path: string, source: string): BlogPost {
  const { data, content } = parseFrontmatter(source);
  const [, filenameDate, filenameSlug] = FILENAME_RE.exec(path) ?? [];

  const title = asString(data.title, filenameSlug ?? 'Untitled');
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const authorshipRaw = asString(data.authorship);
  const authorship =
    authorshipRaw === 'ai-coauthored' || authorshipRaw === 'self-written' ? authorshipRaw : undefined;

  return {
    slug: asString(data.slug) || toSlug(filenameSlug ?? title),
    title,
    excerpt: asString(data.excerpt),
    date: asString(data.date) || filenameDate || '',
    category: asString(data.category, 'Notes'),
    tags,
    readTime: asString(data.readTime) || estimateReadTime(content),
    content,
    draft: data.draft === true,
    authorship,
  };
}

function byDateDescending(a: BlogPost, b: BlogPost): number {
  return b.date.localeCompare(a.date);
}

/** All published posts, newest first. Drafts are excluded from the site. */
export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, source]) => toPost(path, source))
  .filter((post) => !post.draft)
  .sort(byDateDescending);

export function getPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Neighbouring posts in reading order, for the prev/next links at the foot of
 * an article. `newer` is the post published after this one.
 */
export function getAdjacentPosts(slug: string): {
  newer?: BlogPost;
  older?: BlogPost;
} {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};

  return {
    newer: index > 0 ? blogPosts[index - 1] : undefined,
    older: index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined,
  };
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' },
): string {
  if (!iso) return '';
  // Parse as UTC so a YYYY-MM-DD string never slips to the previous day.
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
}

export type { FrontmatterValue };
