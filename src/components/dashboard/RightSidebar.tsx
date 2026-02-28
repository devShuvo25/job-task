import React from 'react';
import { Plus, Pause, Square, ChevronRight } from "lucide-react";
import type { ProjectItem as ProjectItemType } from '@/interface/dashboard';

/**
 * Sidebar Wrapper - Container for Project List and Time Tracker
 */
export const RightSidebar = ({ projects }: { projects: ProjectItemType[] }) => {
  return (
    <div className="flex-[1] min-w-[320px] space-y-6">
      <ProjectList projects={projects} />
      <TimeTracker />
    </div>
  );
};

/**
 * Project List Component
 */
const ProjectList = ({ projects }: { projects: ProjectItemType[] }) => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Project</h3>
        <button className="text-[10px] font-bold border border-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-50 transition-all">
          <Plus size={12} /> New
        </button>
      </div>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectItemRow key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

/**
 * Individual Project Row Component
 */
const ProjectItemRow = ({ title, date, iconColor, bgColor }: ProjectItemType) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
        {/* The dot icon logic from your design */}
        <div className={`w-2 h-2 rounded-full ${iconColor.replace('text-', 'bg-')} shadow-sm`} />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 leading-tight">{title}</p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">Due date: {date}</p>
      </div>
    </div>
    <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
  </div>
);

/**
 * Time Tracker Component
 */
const TimeTracker = () => {
  return (
    <div className="bg-[#0A1F16] p-8 rounded-[24px] text-white flex flex-col justify-between relative overflow-hidden min-h-[280px]">
      <div className="relative z-10">
        <h3 className="text-lg font-medium opacity-80 mb-8">Time Tracker</h3>
        <div className="text-5xl font-mono font-bold text-center my-6 tracking-widest">
          01:24:08
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#0A1F16] shadow-xl hover:scale-110 active:scale-95 transition-all">
            <Pause fill="currentColor" size={24} />
          </button>
          <button className="w-14 h-14 rounded-full bg-[#E54D2E] flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all">
            <Square fill="currentColor" size={20} />
          </button>
        </div>
      </div>
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150 rotate-12" 
        aria-hidden="true"
      />
    </div>
  );
};