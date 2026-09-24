'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, Menu, X } from 'lucide-react';
import { usePlan } from '../context/PlanContext';

const Navbar = () => {
  const pathname = usePathname();
  const { todayPlan, savedPlan } = usePlan();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const planCount = todayPlan.length;
  const savedCount = savedPlan.length;

  return (
    <header className="sticky top-0 z-50 bg-[#0d0e12]/95 backdrop-blur-md border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <Dumbbell className="w-6 h-6 text-[#ccff00] stroke-[2.5]" />
            <span className="text-xl font-black tracking-wider text-white uppercase font-mono">
              FITLOG
            </span>
          </Link>

          {/* Center: Navigation Links (Figma Pill Design) */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className={`text-xs font-bold transition-all px-4 py-1.5 rounded-full ${
                pathname === '/'
                  ? 'bg-[#1e222b] text-[#ccff00]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`text-xs font-bold transition-all px-4 py-1.5 rounded-full ${
                pathname === '/my-plan'
                  ? 'bg-[#1e222b] text-[#ccff00]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              My Plan
            </Link>
          </nav>

          {/* Right: Badge Counters (Figma Circular Badge Design) */}
          <div className="hidden sm:flex items-center space-x-4 text-xs font-medium text-zinc-400">
            {/* Plan Badge */}
            <Link
              href="/my-plan"
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <span>Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#ccff00] text-slate-950 font-black text-[11px] flex items-center justify-center">
                {planCount}
              </span>
            </Link>

            {/* Saved Badge */}
            <Link
              href="/my-plan"
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <span>Saved</span>
              <span className="w-5 h-5 rounded-full border border-zinc-600 text-zinc-300 font-bold text-[11px] flex items-center justify-center">
                {savedCount}
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#14161d] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-2 rounded-lg text-sm font-bold ${
              pathname === '/' ? 'bg-[#1e222b] text-[#ccff00]' : 'text-zinc-300'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-2 rounded-lg text-sm font-bold ${
              pathname === '/my-plan' ? 'bg-[#1e222b] text-[#ccff00]' : 'text-zinc-300'
            }`}
          >
            My Plan
          </Link>

          <div className="flex items-center justify-around pt-3 border-t border-zinc-800 text-xs font-medium text-zinc-400">
            <Link
              href="/my-plan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2"
            >
              <span>Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#ccff00] text-slate-950 font-black text-[11px] flex items-center justify-center">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2"
            >
              <span>Saved</span>
              <span className="w-5 h-5 rounded-full border border-zinc-600 text-zinc-300 font-bold text-[11px] flex items-center justify-center">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
