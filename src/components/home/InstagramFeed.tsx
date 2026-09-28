import React from 'react';
import { Instagram, ArrowUpRight, Heart } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const InstagramFeed: React.FC = () => {
  const { addToast } = useShop();

  const handleFollowClick = () => {
    addToast('Visiting our Instagram community @daisydreams.florals', 'gold');
    window.open('https://instagram.com', '_blank');
  };

  return (
    <section className="py-20 bg-white border-b border-[#A8BFA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-[0.2em] text-[#C6A15B] mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>@daisydreams.florals</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight">
              Made For Your Moments
            </h2>
          </div>

          <button
            onClick={handleFollowClick}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-wider text-[#12372A] hover:text-[#2F6B4F] group cursor-pointer"
          >
            <span>Follow Our Journey</span>
            <ArrowUpRight className="w-4 h-4 text-[#C6A15B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* 6 Grid Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={handleFollowClick}
              className="group relative aspect-square overflow-hidden rounded-xs cursor-pointer shadow-xs"
            >
              <img
                src={post.image}
                alt="Instagram floral moment"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Hover overlay with likes and Instagram icon */}
              <div className="absolute inset-0 bg-[#12372A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 text-[#C6A15B] mb-1.5" />
                <div className="flex items-center gap-1 text-xs font-semibold tabular-nums">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] text-[#A8BFA8] mt-1 line-clamp-2 px-1">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
