'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Calendar, Bookmark, CheckCircle2 } from 'lucide-react';
import { usePlan } from '../../../context/PlanContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { staticWorkouts } from '../../../data/staticWorkouts';

export default function WorkoutDetailsPage() {
  const params = useParams();
  const workoutId = params?.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToTodayPlan, addToSaved, todayPlan, savedPlan } = usePlan();

  useEffect(() => {
    if (!workoutId) return;

    const fetchWorkoutDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.error('Using fallback details:', error);
        const found = staticWorkouts.find((w) => String(w.id) === String(workoutId));
        setWorkout(found || null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [workoutId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!workout) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-black uppercase text-white font-mono">WORKOUT NOT FOUND</h1>
        <p className="text-zinc-400 text-sm">The requested workout could not be located in the library.</p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#ccff00] text-slate-950 font-bold text-xs uppercase"
        >
          <span>Back to Workouts</span>
        </Link>
      </div>
    );
  }

  const isTodayAdded = todayPlan.some((item) => String(item.id) === String(workout.id));
  const isSavedAdded = savedPlan.some((item) => String(item.id) === String(workout.id));

  const handleAddToPlan = () => {
    const result = addToTodayPlan(workout);
    if (result.success) {
      toast.success(`${workout.name} added to today's plan!`);
    } else if (result.reason === 'cap') {
      toast.warn("Today's plan cap reached! (Maximum 5 lifts allowed)");
    } else if (result.reason === 'duplicate') {
      toast.info(`${workout.name} is already in today's plan.`);
    }
  };

  const handleSaveForLater = () => {
    const result = addToSaved(workout);
    if (result.success) {
      toast.success(`${workout.name} saved for later!`);
    } else if (result.reason === 'duplicate') {
      toast.info(`${workout.name} is already in your saved list.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Visual Image */}
        <div className="lg:col-span-5">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#14161e] border border-zinc-800/80 shadow-2xl">
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header & Tags */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
              {workout.name}
            </h1>

            <p className="text-sm text-[#8b94a5] leading-relaxed">
              {workout.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {workout.muscleGroups?.map((group, index) => (
                <span
                  key={index}
                  className="text-[11px] font-black tracking-wider uppercase bg-[#ccff00] text-slate-950 px-3 py-1 rounded-full shadow-xs"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* Key Specs Table Panel (Matching Figma Screenshot 100%) */}
          <div className="bg-[#14161e] border border-zinc-800/80 rounded-2xl overflow-hidden divide-y divide-zinc-800/60">
            <div className="flex items-center justify-between px-5 py-3.5 text-xs">
              <span className="font-bold text-zinc-500 uppercase tracking-wider">EQUIPMENT</span>
              <span className="font-medium text-white">{workout.equipment}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5 text-xs">
              <span className="font-bold text-zinc-500 uppercase tracking-wider">DIFFICULTY</span>
              <span className="font-medium text-white">{workout.difficulty}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5 text-xs">
              <span className="font-bold text-zinc-500 uppercase tracking-wider">SETS</span>
              <span className="font-medium text-white">{workout.sets}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5 text-xs">
              <span className="font-bold text-zinc-500 uppercase tracking-wider">REPS</span>
              <span className="font-medium text-white">{workout.reps}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5 text-xs">
              <span className="font-bold text-zinc-500 uppercase tracking-wider">DURATION</span>
              <span className="font-medium text-white">{workout.duration} min</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5 text-xs">
              <span className="font-bold text-zinc-500 uppercase tracking-wider">CALORIES</span>
              <span className="font-medium text-white">{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5 text-xs">
              <span className="font-bold text-zinc-500 uppercase tracking-wider">RATING</span>
              <span className="font-medium text-white">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-white font-mono">
              INSTRUCTIONS
            </h3>

            <ol className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed list-decimal list-inside font-medium">
              {workout.instructions?.map((step, index) => (
                <li key={index} className="pl-1">
                  <span className="text-zinc-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action CTA Buttons Row (Matching Figma Screenshot 100%) */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Primary Button */}
            <button
              onClick={handleAddToPlan}
              className={`inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors ${
                isTodayAdded
                  ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  : 'bg-[#ccff00] text-slate-950 hover:bg-[#b8e600]'
              }`}
            >
              {isTodayAdded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>In today's plan</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Add to today's plan</span>
                </>
              )}
            </button>

            {/* Secondary Button */}
            <button
              onClick={handleSaveForLater}
              className={`inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-colors ${
                isSavedAdded
                  ? 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  : 'border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white bg-transparent'
              }`}
            >
              {isSavedAdded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Saved for later</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save for later</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
