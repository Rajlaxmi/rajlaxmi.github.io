import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLink from '../components/SectionLink';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useReveal from '../hooks/useReveal';
import { blogPosts, formatDate } from '../lib/posts';

const WritingPage: React.FC = () => {
  useReveal();
  useDocumentTitle('Writing — Raila', 'Reflections on algorithms, reasoning and multimodality.');

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <div className="mx-auto max-w-page px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
          <p className="eyebrow">index</p>
          <h1 className="mt-5 font-serif text-title text-ink">Writing</h1>
          <p className="mt-6 max-w-[38rem] text-[0.807860rem] leading-[1.55] text-muted">
            Reflections on algorithms, reasoning and multimodality.
          </p>
        </div>

        <div className="mx-auto max-w-page px-6 pb-24 sm:px-10">
          <ul className="border-t border-rule">
            {blogPosts.map((post) => (
              <li key={post.slug} data-reveal>
                <Link to={`/blog/${post.slug}`} className="group block border-b border-rule py-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-[0.848251rem] text-ink transition-colors duration-300 group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="eyebrow shrink-0">
                      {post.category} · {formatDate(post.date)}
                    </p>
                  </div>

                  <p className="mt-2 max-w-measure text-muted">{post.excerpt}</p>

                  <p className="mt-4 flex items-center gap-2 text-[0.605894rem] text-faint transition-colors duration-300 group-hover:text-accent">
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

          <p className="mt-10">
            <SectionLink
              sectionId="blog"
              className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-ink"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:-translate-x-1"
              />
              <span className="eyebrow">back to portfolio</span>
            </SectionLink>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WritingPage;
