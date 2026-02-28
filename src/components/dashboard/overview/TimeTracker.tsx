/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { Pause, Square, Play } from "lucide-react";

const TimeTracker = () => {
  const [seconds, setSeconds] = useState(5048); 
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="bg-[#123524] p-8 rounded-[32px] text-white flex flex-col justify-between relative overflow-hidden min-h-[280px] shadow-2xl">
      
      {/* 1. The "Wave" Background Decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Green Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#123524] via-[#0E2A1C] to-[#07160F]" />
        
        {/* Sweeping Waves (using borders to create the thin line look in the image) */}
        <div className="absolute top-[-20%] left-[-10%] w-[150%] h-[150%] border-[1px] border-white/5 rounded-[40%] rotate-[12deg]" />
        <div className="absolute top-[-10%] left-[-5%] w-[140%] h-[140%] border-[1px] border-white/10 rounded-[42%] rotate-[15deg]" />
        <div className="absolute top-0 left-0 w-[130%] h-[130%] border-[1px] border-white/5 rounded-[45%] rotate-[18deg]" />
        
        {/* Soft Glow */}
        <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-[#1B5E3F] blur-[100px] opacity-40 rounded-full" />
      </div>

      <div className="relative z-10">
        <h3 className="text-[20px] font-semibold text-white/90 mb-6">Time Tracker</h3>
        
        {/* Digital Display - Matched Font weight and spacing */}
        <div className="text-[64px] font-bold text-center my-8 tracking-tighter tabular-nums leading-none">
          {formatTime(seconds)}
        </div>

        <div className="flex justify-center gap-6 mt-6">
          {/* Pause Button - Styled as white circle */}
          <button 
            onClick={() => setIsActive(!isActive)}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#123524] shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {isActive ? <Pause fill="currentColor" size={28} /> : <Play fill="currentColor" size={28} className="ml-1" />}
          </button>

          {/* Stop Button - Styled as red circle */}
          <button 
            onClick={handleReset}
            className="w-16 h-16 rounded-full bg-[#E54D2E] flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Square fill="currentColor" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;