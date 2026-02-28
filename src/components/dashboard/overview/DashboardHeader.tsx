import React from 'react';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  onAddProject?: () => void;
  onImportData?: () => void;
}

const DashboardHeader = ({ 
  title = "Dashboard", 
  description = "Plan, prioritize, and accomplish your tasks with ease.",
  onAddProject,
  onImportData
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-400 text-sm mt-1 font-medium">
          {description}
        </p>
      </div>
      
      <div className="flex gap-3 w-full sm:w-auto">
        <button 
          onClick={onAddProject}
          className='btn-gradient'
        >
          <Plus size={18} /> 
          Add {title}
        </button>
        
        <button 
          onClick={onImportData}
          className="flex flex-1 sm:flex-none items-center justify-center px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors bg-white shadow-sm active:scale-95"
        >
          Import Data
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;