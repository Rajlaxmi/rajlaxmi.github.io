import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Design': 'bg-stone-200 text-stone-700',
      'Development': 'bg-stone-300 text-stone-800',
      'Philosophy': 'bg-stone-100 text-stone-600',
      'UX': 'bg-stone-200 text-stone-700',
      'Productivity': 'bg-stone-100 text-stone-600',
    };
    return colors[category] ?? 'bg-stone-200 text-stone-700';
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-light tracking-wide text-stone-800 hover:text-stone-600 transition-colors"
          >
            Raila
          </Link>
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="inline-flex items-center space-x-1 text-sm font-light text-stone-500 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Portfolio</span>
            </Link>
            <span className="text-sm font-light text-stone-800 border-b border-stone-400">Blog</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-light tracking-widest uppercase text-stone-400 mb-4">Writing</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-wide text-stone-800 mb-6">
            Thoughts
          </h1>
          <div className="h-px w-16 bg-stone-400 mb-8"></div>
          <p className="text-lg text-stone-500 font-light max-w-xl leading-relaxed">
            Reflections on algorithms, reasoning and multimodality.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-light tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-stone-800 text-stone-50'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-stone-400 font-light text-center py-16">No posts in this category yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <article className="bg-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-stone-100">
                    {/* Meta row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-light tracking-wide ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-stone-400">
                        <Clock size={11} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-light text-stone-800 mb-3 group-hover:text-stone-600 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-stone-500 font-light text-sm leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                      <div className="flex items-center space-x-1.5 text-xs text-stone-400">
                        <Calendar size={11} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-stone-500 group-hover:text-stone-800 transition-colors text-xs font-light">
                        <span>Read</span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-sm font-light text-stone-500 hover:text-stone-800 transition-colors">
            rajlaxmi.github.io
          </Link>
          <p className="text-xs text-stone-400 font-light">More thoughts coming soon</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogList;
