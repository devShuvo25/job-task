import React from 'react';

const ProjectAnalytics = () => {
  const data = [
    { day: "S", height: "50%", type: "pattern" },
    { day: "M", height: "80%", type: "active" },
    { day: "T", height: "65%", type: "active", label: "74%" },
    { day: "W", height: "100%", type: "dark" },
    { day: "T", height: "75%", type: "pattern" },
    { day: "F", height: "60%", type: "pattern" },
    { day: "S", height: "40%", type: "pattern" },
  ];

  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm w-full">
      <h3 className="text-lg font-bold mb-8 text-gray-900">Project Analytics</h3>
      
      <div className="flex justify-between items-end h-48 px-2">
        {data.map((item, index) => (
          <Bar 
            key={index}
            day={item.day} 
            height={item.height} 
            variant={item.type as 'pattern' | 'active' | 'dark'} 
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

// --- Sub-component: Bar ---
interface BarProps {
  day: string;
  height: string;
  variant: 'pattern' | 'active' | 'dark';
  label?: string;
}

const Bar = ({ day, height, variant, label }: BarProps) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full group">
      <div className="w-10 bg-gray-50 rounded-full relative h-36 flex flex-col justify-end overflow-hidden">
        
        {/* Tooltip/Label for active bars (e.g., Tuesday 74%) */}
        {label && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 z-10">
            <div className="bg-white shadow-xl border border-gray-100 px-2 py-1 rounded-lg text-[10px] font-bold text-gray-500 whitespace-nowrap relative">
              {label}
              {/* Tooltip Arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-100 rotate-45" />
            </div>
          </div>
        )}

        {/* The Actual Bar Pill */}
        <div 
          style={{ height }} 
          className={`w-full rounded-full transition-all duration-500 relative ${
            variant === 'dark' ? 'bg-[#0A1F16]' : 
            variant === 'active' ? 'bg-[#2D8C5B]' : 
            'bg-gray-100'
          }`}
        >
          {/* Diagonal Stripe Pattern Overlay for "Pattern" variant */}
          {variant === 'pattern' && (
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #9ca3af 0, #9ca3af 1px, transparent 0, transparent 50%)`,
                backgroundSize: '6px 6px'
              }}
            />
          )}
        </div>
      </div>
      
      {/* Day Label */}
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        {day}
      </span>
    </div>
  );
};

export default ProjectAnalytics;