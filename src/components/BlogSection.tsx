import React from 'react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onReadArticle: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadArticle }) => {
  return (
    <section id="blog" className="py-10 sm:py-14 bg-[#faf8f5] text-[#1a1918] border-t border-[#eae4db]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c59b67] rounded-full" />
            <span>EDITORIAL JOURNAL</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-4">
            From Our <span className="italic font-serif-luxury text-[#c59b67]">Journal</span>
          </h2>
          <p className="text-[#68625d] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            Architectural perspectives, Scandinavian craftsmanship, and the evolution of coastal luxury in Chennai.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadArticle(post)}
              className="group bg-white rounded-[20px] overflow-hidden border border-[#eae4db] hover:border-[#c59b67] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col cursor-pointer shadow-sm hover:shadow-xl"
            >
              {/* Thumbnail with Tag Pill */}
              <div className="relative h-52 overflow-hidden bg-[#eae5dc]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-white/95 backdrop-blur-md text-[#1a1918] border border-[#e5ded4]">
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-[#8c827a] mb-2.5 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#c59b67]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c59b67]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#1a1918] leading-snug group-hover:text-[#c59b67] transition-colors mb-2">
                    {post.title}
                  </h3>

                  <p className="text-[#68625d] text-xs line-clamp-3 leading-relaxed font-light">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f0ece4] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#1a1918] group-hover:text-[#c59b67] transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#c59b67]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
