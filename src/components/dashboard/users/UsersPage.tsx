/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { MoreHorizontal, Mail, Shield } from 'lucide-react';
import DashboardHeader from '../DashboardHeader';
import { useGetUsersQuery } from '@/redux/api/dashboardApis';
import Image from 'next/image';

const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery(undefined);

  return (
    <div className="p-8 space-y-8">
      {/* Reusing your DashboardHeader */}
      <DashboardHeader
        title="Team Members" 
        description="Manage your team members and their account permissions."
        onAddProject={() => console.log("Invite User")}
      />

      <div className="bg-white rounded-3xlborder border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                // Simple Loading State
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8 bg-gray-50/30" />
                  </tr>
                ))
              ) : (
                users?.map((user: any) => (
                  <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F1F5F3] overflow-hidden border border-gray-100">
                           <Image
                            fill 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                            alt={user.name} 
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Mail size={12} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                        <Shield size={14} className="text-[#1B5E3F]" />
                        {user.role || 'Member'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-medium">
                      Nov 24, 2024
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
          <p className="text-xs text-gray-400 font-medium">Showing {users?.length || 0} members</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold border border-gray-200 rounded-md bg-white hover:bg-gray-50">Prev</button>
            <button className="px-3 py-1 text-xs font-bold border border-gray-200 rounded-md bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;