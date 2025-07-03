import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-stone-800 mb-4">Post Not Found</h1>
          <Link to="/" className="text-stone-600 hover:text-stone-800 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Design': 'bg-stone-200 text-stone-700',
      'Development': 'bg-stone-300 text-stone-800',
      'Philosophy': 'bg-stone-100 text-stone-600',
      'UX': 'bg-stone-250 text-stone-750'
    };
    return colors[category as keyof typeof colors] || 'bg-stone-200 text-stone-700';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-light">Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </header>
      {/* Article */}
      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article Header */}
          <header className="mb-16 text-center">
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-light tracking-wide ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-stone-800 mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm text-stone-500 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar size={14} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="h-px w-24 bg-stone-400 mx-auto"></div>
          </header>
          {/* Article Content */}
          <div className="prose prose-stone max-w-none">
            <div className="text-xl font-light text-stone-600 leading-relaxed mb-12 text-center max-w-3xl mx-auto">
              {post.excerpt}
            </div>
            <div className="space-y-8 text-stone-700 font-light leading-relaxed">
              {post.content.map((section, index) => (
                <div key={index}>
                  {section.type === 'paragraph' && (
                    <p 
                      className="text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  )}
                  {section.type === 'heading' && (
                    <h2 
                      className="text-2xl font-light text-stone-800 mt-12 mb-6"
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  )}
                  {section.type === 'quote' && (
                    <blockquote 
                      className="border-l-2 border-stone-300 pl-8 my-8 italic text-xl text-stone-600"
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  )}
                  {section.type === 'image' && (
                    <img
                      src={section.src}
                      alt={section.alt || ''}
                      className="my-8 mx-auto rounded shadow max-w-full"
                      style={{ maxHeight: 400 }}
                    />
                  )}
                  {section.type === 'table' && (
                    <div className="my-8 overflow-x-auto">
                      <table className="min-w-full border border-stone-200 rounded-lg overflow-hidden">
                        <thead className="bg-stone-50">
                          <tr>
                            {section.headers.map((header, headerIndex) => (
                              <th
                                key={headerIndex}
                                className="px-6 py-3 text-left text-sm font-medium text-stone-700 border-b border-stone-200"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-stone-200">
                          {section.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-stone-50">
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="px-6 py-4 text-sm text-stone-600 border-b border-stone-100"
                                  dangerouslySetInnerHTML={{ __html: cell }}
                                />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-stone-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 rounded-full mb-6">
                <div className="w-3 h-3 bg-stone-400 rounded-full"></div>
              </div>
              <p className="text-sm text-stone-500 font-light mb-8">
                Thank you for reading
              </p>
              <Link 
                to="/"
                className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
              >
                <ArrowLeft size={14} />
                <span className="text-sm font-light">Return to Portfolio</span>
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;