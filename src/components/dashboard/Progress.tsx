import React from 'react';

interface ProgressLabelProps {
  color: string;
  label: string;
  pattern?: boolean;
}

interface ProjectProgressProps {
  percentage?: number;
  title?: string;
  subtitle?: string;
}

const ProjectProgress = ({ 
  percentage = 41, 
  title = "Project Progress", 
  subtitle = "Project Ended" 
}: ProjectProgressProps) => {
  // Logic to calculate rotation based on percentage if you want to make the CSS dynamic
  // For now, it stays at the design's fixed -rotate-[25deg]
  
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold mb-6 text-gray-900">{title}</h3>
      
      <div className="relative flex flex-col items-center justify-center flex-1">
        {/* Semi-circle Donut Chart */}
        <div className="w-48 h-24 overflow-hidden relative">
          {/* Background Track */}
          <div className="w-48 h-48 rounded-full border-[20px] border-gray-100 absolute top-0" />
          
          {/* Progress Bar */}
          <div 
            className="w-48 h-48 rounded-full border-[20px] border-[#1B5E3F] absolute top-0 border-r-transparent border-b-transparent -rotate-[25deg] transition-transform duration-1000" 
          />
        </div>

        {/* Percentage Text */}
        <div className="mt-[-20px] text-center bg-white px-4">
          <span className="text-4xl font-extrabold text-gray-900">
            {percentage}%
          </span>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            {subtitle}
          </p>
        </div>

        {/* Legend/Labels */}
        <div className="grid grid-cols-3 gap-2 w-full mt-8">
          <ProgressLabel color="bg-[#1B5E3F]" label="Completed" />
          <ProgressLabel color="bg-[#0A1F16]" label="In Progress" />
          <ProgressLabel 
            color="bg-gray-200" 
            label="Pending" 
            pattern 
          />
        </div>
      </div>
    </div>
  );
};

// --- Internal Sub-component ---

const ProgressLabel = ({ color, label, pattern }: ProgressLabelProps) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className={`w-3 h-3 rounded-full ${color} relative overflow-hidden`}>
      {pattern && (
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_#9ca3af_0,_#9ca3af_1px,_transparent_0,_transparent_50%)] bg-[length:4px_4px]" />
      )}
    </div>
    <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">
      {label}
    </span>
  </div>
);

export default ProjectProgress;