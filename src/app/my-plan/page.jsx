'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Flame, Star, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { usePlan } from '../../context/PlanContext';

export default function MyPlanPage() {
  const {
    todayPlan,
    savedPlan,
    completedIds,
    removeFromTodayPlan,
    removeFromSaved,
    toggleMarkAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'saved'
  const [sortBy, setSortBy] = useState('duration');

  const activeList = activeTab === 'today' ? todayPlan : savedPlan;

  // Sorted list
  const sortedList = [...activeList].sort((a, b) => {
    if (sortBy === 'calories') return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (a.duration || 0) - (b.duration || 0);
  });

  // Live Metrics Calculations matching Figma
  const totalExercises = activeList.length;
  const totalMinutes = activeList.reduce((sum, item) => sum + (item.duration || 0), 0);
  const totalCalories = activeList.reduce((sum, item) => sum + (item.caloriesBurned || 0), 0);

  const handleRemove = (id, name) => {
    if (activeTab === 'today') {
      removeFromTodayPlan(id);
    } else {
      removeFromSaved(id);
    }
    toast.info(`${name} removed from ${activeTab === 'today' ? "today's plan" : 'saved list'}.`);
  };

  const handleToggleDone = (id, name) => {
    toggleMarkAsDone(id);
    const isDone = completedIds.includes(id);
    if (!isDone) {
      toast.success(`Marked ${name} as done!`);
    } else {
      toast.info(`Marked ${name} as incomplete.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
          MY PLAN
        </h1>
        <p className="text-[#8b94a5] text-xs sm:text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (Figma Single Card 3-Column Layout 100%) */}
      <div className="bg-[#14161e] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x divide-zinc-800/80 shadow-2xl">
        {/* Exercises */}
        <div className="sm:px-6 first:sm:pl-0 space-y-1">
          <span className="text-xs font-medium text-[#8b94a5] block">Exercises</span>
          <span className="text-4xl font-black text-[#ccff00] block font-mono">
            {totalExercises}
          </span>
        </div>

        {/* Minutes */}
        <div className="sm:px-8 space-y-1">
          <span className="text-xs font-medium text-[#8b94a5] block">Minutes</span>
          <span className="text-4xl font-black text-white block font-mono">
            {totalMinutes}
          </span>
        </div>

        {/* Calories */}
        <div className="sm:px-8 space-y-1">
          <span className="text-xs font-medium text-[#8b94a5] block">Calories</span>
          <span className="text-4xl font-black text-white block font-mono">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Tabs Row & Sort By (Matching Figma Screenshot 100%) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="bg-[#14161e] border border-zinc-800/80 p-1 rounded-2xl inline-flex space-x-1">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-[#1e222b] text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#1e222b] text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <span>Sort By</span>
          <div className="bg-[#14161e] border border-zinc-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="duration" className="bg-[#14161e]">Duration</option>
              <option value="calories" className="bg-[#14161e]">Calories</option>
              <option value="rating" className="bg-[#14161e]">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workout List or Empty State (Matching Figma Screenshot 100% - No Icon Circle) */}
      {sortedList.length === 0 ? (
        <div className="bg-[#14161e] border-2 border-dashed border-zinc-800/80 rounded-3xl p-16 text-center space-y-4 my-8">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase tracking-tight font-mono">
              NOTHING HERE YET
            </h3>
            <p className="text-xs text-[#8b94a5] max-w-xs mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#ccff00] text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => {
            const isDone = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#14161e] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg transition-all hover:border-zinc-700"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4
                      className={`text-sm sm:text-base font-black uppercase tracking-tight font-mono ${
                        activeTab === 'today' && isDone ? 'line-through text-zinc-500' : 'text-white'
                      }`}
                    >
                      {item.name}
                    </h4>

                    <p className="text-xs text-[#8b94a5] mt-0.5">
                      {item.equipment}
                    </p>

                    <div className="flex items-center space-x-3 text-xs text-zinc-400 mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                        <span>{item.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        <span>{item.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center space-x-1 font-bold text-white">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-300 font-bold text-xs hover:border-zinc-500 hover:text-white transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === 'today' && (
                    <button
                      onClick={() => handleToggleDone(item.id, item.name)}
                      className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-full font-black text-xs transition-colors ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-[#ccff00] text-slate-950 hover:bg-[#b8e600]'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isDone ? 'Done' : 'Mark as Done'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="p-1 text-zinc-500 hover:text-white transition-colors ml-1"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
