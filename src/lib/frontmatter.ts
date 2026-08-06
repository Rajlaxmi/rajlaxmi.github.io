/**
 * A deliberately small YAML-subset frontmatter parser.
 *
 * We only need what blog posts actually use — flat `key: value` pairs, inline
 * arrays, quoted strings and booleans — so this avoids pulling in gray-matter
 * (which needs a Buffer polyfill to run in the browser bundle).
 *
 * Supported:
 *   title: Entelechy
 *   title: "Quoted: with a colon"
 *   tags: [philosophy, aristotle]
 *   draft: true
 */

export type FrontmatterValue = string | boolean | string[];

export interface ParsedMarkdown {
  data: Record<string, FrontmatterValue>;
  content: string;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function unquote(raw: string): string {
  const value = raw.trim();
  if (
    (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
    (value.startsWith("'") && value.endsWith("'") && value.length > 1)
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function coerce(raw: string): FrontmatterValue {
  const value = raw.trim();

  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map(unquote).filter(Boolean);
  }

  if (value === 'true') return true;
  if (value === 'false') return false;

  return unquote(value);
}

export function parseFrontmatter(source: string): ParsedMarkdown {
  const match = FRONTMATTER_RE.exec(source);

  if (!match) {
    return { data: {}, content: source.trim() };
  }

  const data: Record<string, FrontmatterValue> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf(':');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1);
    if (key) data[key] = coerce(value);
  }

  return { data, content: source.slice(match[0].length).trim() };
}

/** Reads a frontmatter field as a string, falling back when absent. */
export function asString(value: FrontmatterValue | undefined, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.join(', ');
  return fallback;
}
