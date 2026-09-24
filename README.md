# 💪 FitLog — Workout Library & Gym Companion

A dark, no-nonsense gym companion and workout planning web application built with **Next.js (App Router)**, **Tailwind CSS**, and **React Context API**.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/shajibsikder/B14-A6-Fit-Log](https://github.com/shajibsikder/B14-A6-Fit-Log)
- **Live Site**: [https://b14-a6-fit-log-eta.vercel.app/](https://b14-a6-fit-log-eta.vercel.app/)

---

## 🛠️ Technologies Used
- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Toast Notifications**: React-Toastify
- **State Management**: React Context API & LocalStorage Persistence
- **API Source**: FitLog API (`https://api.abcz.workers.dev/api/fitlog`)

---

## ✨ 5 Key Features

1. **Workout Library & 3x4 Responsive Grid**:
   Explore 12 lifts covering major muscle groups with illustration images, category tags (`CHEST`, `ARMS`), equipment specifications, and stats for duration, calories burned, and ratings.

2. **Dynamic Workout Details (`/workout/[id]`)**:
   Deep dive into individual exercises with a key specs panel, 4-step instructions, and direct action buttons to add lifts to today's plan or save for later.

3. **Live My Plan Dashboard (`/my-plan`)**:
   Features dual tabs for **Today's Plan** and **Saved for Later**, along with live metrics summary cards (`Exercises`, `Total Minutes`, `Total Calories`) that recalculate instantly as items are added or removed.

4. **Plan Cap & Mark as Done**:
   Enforces a 5-lift cap for today's plan with automatic button disabling and toast warnings. Allows users to mark workouts as completed with visual strike-through and status badges.

5. **Sorting Controls & Toastify Alerts**:
   Allows sorting library workouts dynamically by Duration, Calories, or Rating. Delivers real-time toast notifications for all user interactions.
