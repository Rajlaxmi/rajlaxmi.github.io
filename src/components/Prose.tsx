import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Turns heading text into a stable anchor id. */
function slugify(node: React.ReactNode): string {
  return React.Children.toArray(node)
    .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function isExternal(href = ''): boolean {
  return /^https?:\/\//i.test(href);
}

const components: Components = {
  h1: ({ children }) => (
    <h2 id={slugify(children)} className="scroll-mt-28">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 id={slugify(children)} className="scroll-mt-28">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(children)} className="scroll-mt-28">
      {children}
    </h3>
  ),

  a: ({ href, children }) => {
    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
          <span aria-hidden="true" className="ml-0.5 align-super text-[0.6em] text-faint">
            ↗
          </span>
        </a>
      );
    }

    // In-page anchors are scrolled manually: the app runs on a HashRouter, so
    // letting the browser write to location.hash would blow away the route.
    if (href?.startsWith('#')) {
      return (
        <a
          href={href}
          onClick={(event) => {
            event.preventDefault();
            document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {children}
        </a>
      );
    }

    return <a href={href}>{children}</a>;
  },

  // A lone image inside a paragraph is unwrapped so `img` can render a <figure>
  // without producing invalid <figure>-inside-<p> markup.
  p: ({ node, children }) => {
    const onlyChild = node?.children.length === 1 ? node.children[0] : undefined;
    if (onlyChild && onlyChild.type === 'element' && onlyChild.tagName === 'img') {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },

  img: ({ src, alt }) => (
    <figure className="my-10">
      <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} loading="lazy" />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  ),

  // Tables are frequently wider than the reading measure; give them their own
  // horizontal scroll container so the page body never scrolls sideways.
  table: ({ children }) => (
    <div className="table-scroll my-10">
      <table>{children}</table>
    </div>
  ),
};

interface ProseProps {
  children: string;
  className?: string;
}

const Prose: React.FC<ProseProps> = ({ children, className = '' }) => (
  <div className={`prose ${className}`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  </div>
);

export default Prose;
