import React from 'react';
import { Flower2, PenLine, Heart, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Bouquet',
      description: 'Select from our signature curated arrangements or build your bespoke stem combination.',
      icon: Flower2,
    },
    {
      num: '02',
      title: 'Personalize Your Order',
      description: 'Add a handwritten calligraphy message card, select wrapping linen, and pick your preferred delivery time slot.',
      icon: PenLine,
    },
    {
      num: '03',
      title: 'We Handcraft It',
      description: 'Our master florists spiral-tie every stem at peak freshness with protective hydration reserves.',
      icon: Heart,
    },
    {
      num: '04',
      title: 'Delivered With Care',
      description: 'Transported in temperature-controlled chilled couriers right to their doorstep with white-glove respect.',
      icon: Truck,
    },
  ];

  return (
    <section className="py-20 bg-[#F8F5ED] border-b border-[#A8BFA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#C6A15B] block mb-2">
            The Botanical Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#18231D]/80">
            From morning flower harvests to unforgettable doorstep smiles in four deliberate steps.
          </p>
        </div>

        {/* 4 Steps Row with Connecting Line */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/4 left-[12%] right-[12%] h-[1px] bg-[#A8BFA8]/40 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex flex-col items-center text-center p-6 bg-white border border-[#A8BFA8]/25 rounded-xs shadow-xs hover:border-[#2F6B4F] transition-all group"
                >
                  {/* Elegant Numbered Typography */}
                  <div className="font-serif text-3xl sm:text-4xl font-light text-[#C6A15B] mb-2 tracking-wider">
                    {step.num}
                  </div>

                  <div className="w-12 h-12 rounded-full bg-[#12372A]/5 flex items-center justify-center text-[#2F6B4F] group-hover:bg-[#12372A] group-hover:text-[#F8F5ED] transition-colors mb-4">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#12372A] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#18231D]/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
