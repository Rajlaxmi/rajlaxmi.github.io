import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
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
    <section id="blog" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-6">
            Thoughts
          </h2>
          <div className="h-px w-16 bg-stone-400 mx-auto mb-6"></div>
          <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto">
            Reflections on algorithms, reasoning and multimodality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group cursor-pointer">
              <article className="bg-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-light tracking-wide ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-4 text-xs text-stone-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-light text-stone-800 mb-4 group-hover:text-stone-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-stone-600 font-light text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div className="flex items-center space-x-2 text-stone-600 group-hover:text-stone-800 transition-colors text-sm">
                    <span className="font-light">Read More</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                    <div className="w-2 h-2 bg-stone-400 rounded-full"></div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-sm">
            <div className="w-3 h-3 bg-stone-400 rounded-full"></div>
          </div>
          <p className="text-sm text-stone-500 font-light">
            More thoughts coming soon
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;