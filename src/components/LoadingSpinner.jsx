'use client';

import React from 'react';
import { Dumbbell } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-[#ccff00] flex items-center justify-center text-slate-950 animate-bounce shadow-lg shadow-[#ccff00]/20">
        <Dumbbell className="w-7 h-7 stroke-[2.5]" />
      </div>
      <p className="text-sm font-black uppercase tracking-widest text-zinc-400 animate-pulse">
        Loading workouts...
      </p>
    </div>
  );
};

export default LoadingSpinner;
