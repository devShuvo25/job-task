/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pause, Square, ChevronRight, Play } from "lucide-react";
import type { ProjectItem as ProjectItemType } from "@/interface/dashboard";
import TimeTracker from "./TimeTracker";

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
const ProjectItemRow = ({
  title,
  date,
  iconColor,
  bgColor,
}: ProjectItemType) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}
      >
        <div
          className={`w-2 h-2 rounded-full ${iconColor.replace("text-", "bg-")} shadow-sm`}
        />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 leading-tight">{title}</p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
          Due date: {date}
        </p>
      </div>
    </div>
    <ChevronRight
      size={16}
      className="text-gray-300 group-hover:text-gray-900 transition-colors"
    />
  </div>
);

/**
 * Time Tracker Component - Now with Real-Time logic
 */
