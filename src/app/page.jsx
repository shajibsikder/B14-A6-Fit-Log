'use client';

import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import WorkoutGrid from '../components/WorkoutGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { staticWorkouts } from '../data/staticWorkouts';

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (!res.ok) {
          throw new Error('API fetch failed');
        }
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Using fallback workout data:', error);
        setWorkouts(staticWorkouts);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <main>
      <Hero />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <WorkoutGrid initialWorkouts={workouts} />
      )}
    </main>
  );
}
