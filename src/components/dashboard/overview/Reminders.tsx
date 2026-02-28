import React from 'react';
import { Video } from 'lucide-react';

interface RemindersCardProps {
  title?: string;
  meetingName?: string;
  timeRange?: string;
  onStartMeeting?: () => void;
}

const RemindersCard = ({ 
  title = "Reminders", 
  meetingName = "Meeting with Arc Company", 
  timeRange = "02.00 pm - 04.00 pm",
  onStartMeeting 
}: RemindersCardProps) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div className='p-4'>
        <h3 className="text-lg font-bold mb-4 text-gray-900">
          {title}
        </h3>
        <h4 className="text-xl font-bold text-[#1B5E3F] leading-tight mb-1">
          {meetingName}
        </h4>
        <p className="text-gray-400 text-sm font-medium">
          Time : {timeRange}
        </p>
      </div>
      
      <div className='p-1'>
        <button 
        onClick={onStartMeeting}
        className='btn-gradient '
      >
        <Video size={20} /> 
        Start Meeting
      </button>
      </div>
    </div>
  );
};

export default RemindersCard;