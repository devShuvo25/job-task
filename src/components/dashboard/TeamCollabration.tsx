import React from 'react';
import { Plus } from 'lucide-react';
// 1. Use type-only import to resolve the conflict
import type { TeamMember as TeamMemberType } from '@/interface/dashboard';

interface TeamCollaborationProps {
  // Use the aliased type here
  members: TeamMemberType[];
  onAddMember?: () => void;
}

const TeamCollaboration = ({ members = [], onAddMember }: TeamCollaborationProps) => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Team Collaboration</h3>
        <button 
          onClick={onAddMember}
          className="text-[11px] font-bold border border-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-50 transition-colors active:scale-95"
        >
          <Plus size={14} /> Add Member
        </button>
      </div>

      <div className="space-y-5">
        {members.map((member, index) => (
          // 2. Call the renamed sub-component
          <TeamMemberRow 
            key={index}
            name={member.name}
            task={member.task}
            status={member.status}
          />
        ))}
      </div>
    </div>
  );
};

// --- Sub-component renamed to avoid conflict ---

const TeamMemberRow = ({ name, task, status }: TeamMemberType) => {
  const statusStyles = {
    Completed: "bg-green-50 text-green-600 border-green-100",
    Pending: "bg-red-50 text-red-600 border-red-100",
    "In Progress": "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <div className="flex items-center justify-between group cursor-default">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-100 transition-transform group-hover:scale-110">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
            alt={name} 
          />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">{name}</p>
          <p className="text-[11px] text-gray-400 font-medium">
            Working on <span className="text-gray-600 font-bold">{task}</span>
          </p>
        </div>
      </div>
      
      <span className={`text-[9px] font-bold px-2 py-1 rounded border whitespace-nowrap ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    </div>
  );
};

export default TeamCollaboration;