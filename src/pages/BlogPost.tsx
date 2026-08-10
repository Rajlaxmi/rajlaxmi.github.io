import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Prose from '../components/Prose';
import ReadingProgress from '../components/ReadingProgress';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatDate, getAdjacentPosts, getPostBySlug } from '../lib/posts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);
  const { newer, older } = post ? getAdjacentPosts(post.slug) : {};

  useDocumentTitle(post ? `${post.title} — Raila` : 'Post not found — Raila', post?.excerpt);

  if (!post) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="mx-auto flex min-h-[70vh] max-w-page items-center px-6 sm:px-10">
          <div>
            <p className="eyebrow mb-4">404</p>
            <h1 className="text-title">This post doesn’t exist.</h1>
            <p className="mt-6">
              <Link to="/#blog" className="link">
                Back to the writing
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <ReadingProgress />
      <Header />

      <main>
        <article className="mx-auto max-w-page px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
          <header className="mx-auto max-w-[42rem]">
            <p className="eyebrow">
              {post.category} · {formatDate(post.date)} · {post.readTime}
            </p>

            <h1 className="mt-5 text-title text-ink">{post.title}</h1>

            {post.excerpt && (
              <p className="mt-6 text-[1.132815rem] italic leading-[1.5] text-muted">{post.excerpt}</p>
            )}

            {post.tags.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="eyebrow text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <hr className="mt-10 border-rule" />
          </header>

          <div className="mx-auto mt-12 max-w-[42rem]">
            <Prose>{post.content}</Prose>
          </div>
        </article>

        {/* Continue reading */}
        {(newer || older) && (
          <nav aria-label="More posts" className="border-t border-rule">
            <div className="mx-auto grid max-w-page gap-px px-6 py-16 sm:grid-cols-2 sm:px-10">
              {newer ? (
                <Link to={`/blog/${newer.slug}`} className="group sm:pr-8">
                  <p className="eyebrow mb-3 flex items-center gap-2">
                    <ArrowLeft size={12} strokeWidth={1.5} />
                    Newer
                  </p>
                  <p className="text-[1.078872rem] text-ink transition-colors duration-300 group-hover:text-accent">
                    {newer.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}

              {older && (
                <Link to={`/blog/${older.slug}`} className="group sm:border-l sm:border-rule sm:pl-8">
                  <p className="eyebrow mb-3 flex items-center gap-2">
                    Older
                    <ArrowRight size={12} strokeWidth={1.5} />
                  </p>
                  <p className="text-[1.078872rem] text-ink transition-colors duration-300 group-hover:text-accent">
                    {older.title}
                  </p>
                </Link>
              )}
            </div>
          </nav>
        )}

        <div className="border-t border-rule">
          <div className="mx-auto max-w-page px-6 py-12 sm:px-10">
            <Link
              to="/#blog"
              className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:-translate-x-1"
              />
              <span className="eyebrow">all writing</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
