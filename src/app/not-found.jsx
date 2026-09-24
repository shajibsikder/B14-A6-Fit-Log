'use client';

import React from 'react';
import Link from 'next/link';
import { Dumbbell, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] flex items-center justify-center">
        <Dumbbell className="w-10 h-10 stroke-[2]" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-6xl font-black text-[#ccff00] block">404</span>
        <h1 className="text-2xl font-black uppercase text-white">PAGE NOT FOUND</h1>
        <p className="text-sm text-zinc-400">
          Looks like you strayed off the workout path. The page you are looking for does not exist.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#ccff00] text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Workouts</span>
      </Link>
    </div>
  );
}
