import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import { blogPosts, formatDate } from '../lib/posts';

const Blog: React.FC = () => (
  <Section
    id="blog"
    index="05"
    label="writing"
    lead="Reflections on algorithms, reasoning and multimodality."
  >
    <ul className="mt-12 border-t border-rule">
      {blogPosts.map((post) => (
        <li key={post.slug} data-reveal>
          <Link to={`/blog/${post.slug}`} className="group block border-b border-rule py-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-[1.198745rem] text-ink transition-colors duration-300 group-hover:text-accent">
                {post.title}
              </h3>
              <p className="eyebrow shrink-0">
                {post.category} · {formatDate(post.date)}
              </p>
            </div>

            <p className="mt-2 max-w-measure text-muted">{post.excerpt}</p>

            <p className="mt-4 flex items-center gap-2 text-[0.856246rem] text-faint transition-colors duration-300 group-hover:text-accent">
              <span>{post.readTime}</span>
              <ArrowRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              />
            </p>
          </Link>
        </li>
      ))}
    </ul>

    <p className="mt-10" data-reveal>
      <Link
        to="/writing"
        className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-accent"
      >
        <span className="eyebrow">all writing</span>
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
        />
      </Link>
    </p>
  </Section>
);

export default Blog;
