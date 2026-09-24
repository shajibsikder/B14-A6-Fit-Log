'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedPlan, setSavedPlan] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedToday = localStorage.getItem('fitlog_today_plan');
      const savedSaved = localStorage.getItem('fitlog_saved_plan');
      const savedDone = localStorage.getItem('fitlog_done_ids');

      if (savedToday) setTodayPlan(JSON.parse(savedToday));
      if (savedSaved) setSavedPlan(JSON.parse(savedSaved));
      if (savedDone) setCompletedIds(JSON.parse(savedDone));
    } catch (error) {
      console.error('Failed to load saved state from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
      localStorage.setItem('fitlog_saved_plan', JSON.stringify(savedPlan));
      localStorage.setItem('fitlog_done_ids', JSON.stringify(completedIds));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [todayPlan, savedPlan, completedIds, isInitialized]);

  // Add to today's plan with 5-item cap check
  const addToTodayPlan = (workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      return { success: false, reason: 'duplicate' };
    }
    if (todayPlan.length >= 5) {
      return { success: false, reason: 'cap' };
    }
    setTodayPlan((prev) => [...prev, workout]);
    return { success: true };
  };

  // Add to saved list
  const addToSaved = (workout) => {
    if (savedPlan.some((item) => item.id === workout.id)) {
      return { success: false, reason: 'duplicate' };
    }
    setSavedPlan((prev) => [...prev, workout]);
    return { success: true };
  };

  // Remove from today's plan
  const removeFromTodayPlan = (workoutId) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== workoutId));
  };

  // Remove from saved list
  const removeFromSaved = (workoutId) => {
    setSavedPlan((prev) => prev.filter((item) => item.id !== workoutId));
  };

  // Toggle mark as done
  const toggleMarkAsDone = (workoutId) => {
    setCompletedIds((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        completedIds,
        addToTodayPlan,
        addToSaved,
        removeFromTodayPlan,
        removeFromSaved,
        toggleMarkAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};
