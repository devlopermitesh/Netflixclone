"use client";

import { create } from "zustand";

interface ProgressTrackerState {
    progress: number;
    setProgress: (progress: number) => void;
}

export const useProgressTracker = create<ProgressTrackerState>((set) => ({
    progress: 0,
    setProgress: (progress: number) => set({ progress }),
}));