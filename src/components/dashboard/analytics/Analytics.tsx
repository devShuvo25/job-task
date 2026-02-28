/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, MousePointer2, Eye, Target } from 'lucide-react';
import DashboardHeader from '../DashboardHeader';

const analyticsData = [
  { date: "2024-01-01", views: 1234, clicks: 456, conversions: 23 },
  { date: "2024-01-02", views: 1567, clicks: 523, conversions: 31 },
  { date: "2024-01-03", views: 1890, clicks: 678, conversions: 42 },
  { date: "2024-01-04", views: 1456, clicks: 534, conversions: 28 },
  { date: "2024-01-05", views: 1789, clicks: 623, conversions: 35 }
];

export const AnalyticsPage = () => {
  // Simple calculation for totals
  const totalViews = analyticsData.reduce((acc, curr) => acc + curr.views, 0);
  const totalClicks = analyticsData.reduce((acc, curr) => acc + curr.clicks, 0);
  const avgConv = (analyticsData.reduce((acc, curr) => acc + curr.conversions, 0) / analyticsData.length).toFixed(1);

  return (
    <div className="p-8 space-y-8 bg-[#FAFAFA] min-h-screen">
      <DashboardHeader
        title="Analytics Overview" 
        description="Track your performance metrics and conversion trends over time."
      />

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Total Views" value={totalViews.toLocaleString()} icon={<Eye size={20}/>} color="text-blue-600" />
        <MetricCard label="Total Clicks" value={totalClicks.toLocaleString()} icon={<MousePointer2 size={20}/>} color="text-orange-500" />
        <MetricCard label="Avg. Conversions" value={avgConv} icon={<Target size={20}/>} color="text-[#1B5E3F]" />
      </div>

      {/* Main Chart Card */}
      <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Performance Trend</h3>
            <p className="text-sm text-gray-400 font-medium">Daily views and click engagement</p>
          </div>
          <div className="flex items-center gap-2 text-[#1B5E3F] bg-[#F1F5F3] px-3 py-1 rounded-full text-xs font-bold">
            <TrendingUp size={14} /> +12.5% vs last week
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B5E3F" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#1B5E3F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 500}}
                dy={10}
                tickFormatter={(str) => str.split('-')[2]} // Just show the day
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 500}} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#1B5E3F" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorViews)" 
              />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stroke="#FACC15" 
                strokeWidth={3}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-6">
          <LegendItem color="bg-[#1B5E3F]" label="Views" />
          <LegendItem color="bg-[#FACC15]" label="Clicks" />
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const MetricCard = ({ label, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
    </div>
    <div className={`p-3 rounded-2xl bg-gray-50 ${color}`}>
      {icon}
    </div>
  </div>
);

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
  </div>
);

export default AnalyticsPage;