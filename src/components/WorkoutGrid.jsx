'use client';

import React from 'react';
import WorkoutCard from './WorkoutCard';

const WorkoutGrid = ({ initialWorkouts }) => {
  return (
    <section id="library" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header matching Figma 100% (No Sort dropdown) */}
      <div className="mb-8 pb-4 border-b border-zinc-800/60">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
          THE LIBRARY
        </h2>
        <p className="text-[#8b94a5] text-xs sm:text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3x4 Responsive Grid matching Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

    </section>
  );
};

export default WorkoutGrid;
