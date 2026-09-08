import React from 'react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onReadArticle: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadArticle }) => {
  return (
    <section id="blog" className="py-20 sm:py-28 bg-[#0b0c0e] text-white border-t border-white/10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>EDITORIAL JOURNAL</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            From Our <span className="italic font-serif-luxury text-[#dfb776]">Blog</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Latest insights on luxury living, design trends, and real estate.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadArticle(post)}
              className="group bg-[#121418] rounded-sm overflow-hidden border border-white/10 hover:border-[#dfb776]/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col cursor-pointer shadow-xl"
            >
              {/* Thumbnail with Tag Pill */}
              <div className="relative h-48 overflow-hidden bg-black/40">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-sm text-[9px] font-mono tracking-wider uppercase font-semibold bg-black/70 backdrop-blur-md text-[#dfb776] border border-[#dfb776]/30">
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#dfb776]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#dfb776]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#dfb776] transition-colors mb-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed font-light">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#dfb776]">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
