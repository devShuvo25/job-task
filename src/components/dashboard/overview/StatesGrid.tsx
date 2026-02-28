import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { StatCardProps } from '@/interface/dashboard';

// Defining the shape of the overview prop
interface StatsGridProps {
  overview: {
    totalUsers?: string | number;
    activeUsers?: string | number;
    revenue?: string | number;
    growth?: string | number;
  };
}

interface StateCardProps {
    label : string
    value : number
}

const StatsGrid = ({ overview }: StatsGridProps) => {
  // Accessing values from the overview object with fallbacks
  const stats = [
    { label: "Total Users", value: overview?.totalUsers ?? 0 },
    { label: "Active Users", value: overview?.activeUsers ?? 0 },
    { label: "Revenue", value: overview?.revenue ?? 0 },
    { label: "Growth", value: overview?.growth ?? 0 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats?.map((stat, index) => (
        <StatCard key={index} label={stat?.label} value={stat?.value as number} />
      ))}
    </div>
  );
};

export const StatCard = ({ label, value }: StateCardProps) => {
  const isFeatured = label === "Total Users";

  if (isFeatured) {
    return (
      <div className="bg-gradient-to-br from-[#14402b] to-[#2D8C5B] p-6 rounded-[24px] text-white relative overflow-hidden group shadow-lg transition-all hover:shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-medium opacity-90">{label}</span>
          <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-all">
            <ArrowUpRight size={20} />
          </button>
        </div>
        <h2 className="text-4xl font-bold">{value}</h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative group hover:shadow-md transition-all h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
        <button className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:text-gray-900 transition-colors border border-gray-100">
          <ArrowUpRight size={18} />
        </button>
      </div>
      <h2 className="text-4xl font-bold text-gray-900">{value}</h2>
    </div>
  );
};

export default StatsGrid;