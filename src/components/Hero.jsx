'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const handleScrollToLibrary = () => {
    const libraryElement = document.getElementById('library');
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      {/* Dark Enclosed Container Box matching Figma */}
      <div className="bg-[#14161e] border border-zinc-800/60 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Eyebrow, Main Heading, Subtitle, CTA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#ccff00] block">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] uppercase font-mono">
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>

            <p className="text-sm sm:text-base text-[#8b94a5] max-w-xl leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            <div className="pt-2">
              <button
                onClick={handleScrollToLibrary}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-[#ccff00] text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
              >
                <span>BROWSE WORKOUTS</span>
                <ChevronDown className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <img
                src="/assets/banner.png"
                alt="Gym Workout Companion"
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
