'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Flame, Star, ChevronRight } from 'lucide-react';

const WorkoutCard = ({ workout }) => {
  const { id, name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group bg-[#14161d] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-lg"
    >
      <div className="space-y-4">
        {/* Workout Image */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Category Tag Pills (Figma Lime Pill with Black Text 100%) */}
        <div className="flex flex-wrap gap-2 pt-1">
          {muscleGroups?.map((group, index) => (
            <span
              key={index}
              className="text-[10px] font-black tracking-wider uppercase bg-[#ccff00] text-slate-950 px-3 py-1 rounded-full shadow-xs"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Title & Equipment */}
        <div>
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight font-mono group-hover:text-[#ccff00] transition-colors">
            {name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            <span className="font-semibold text-zinc-500">Equipment:</span> {equipment}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center space-x-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>{duration} min</span>
        </div>

        <div className="flex items-center space-x-1.5 font-medium">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>{caloriesBurned} kcal</span>
        </div>

        <div className="flex items-center space-x-1 font-bold text-white">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>

        <div className="w-6 h-6 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:bg-[#ccff00] group-hover:text-slate-950 transition-colors">
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
