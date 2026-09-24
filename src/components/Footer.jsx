'use client';

import React from 'react';
import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0b0d] border-t border-zinc-800/80 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand Logo Icon + FITLOG Text (Matching Figma Screenshot 100%) */}
          <Link href="/" className="flex items-center space-x-2.5">
            <Dumbbell className="w-5 h-5 text-[#ccff00] stroke-[2.5]" />
            <span className="text-lg font-black tracking-wider text-white uppercase font-mono">
              FITLOG
            </span>
          </Link>

          {/* Right: Copyright Line */}
          <p className="text-xs text-zinc-500 font-medium text-center sm:text-right">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
