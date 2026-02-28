/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { MoreHorizontal, Mail, Shield, Calendar, Activity } from "lucide-react";
import DashboardHeader from "../overview/DashboardHeader";
import { useGetUsersQuery } from "@/redux/api/dashboardApis";
import Image from "next/image";

const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery(undefined);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-[#FAFAFA] min-h-screen">
      <DashboardHeader
        title="Team Members"
        description="Manage your team members and their account permissions."
        onAddProject={() => console.log("Invite User")}
      />

      {/* ================= DESKTOP TABLE (lg and up) ================= */}
      {/* On desktop, we keep the single white container with borders */}
      <div className="hidden lg:block bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/20">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                User
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Role
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Joined Date
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8 bg-gray-50/30" />
                  </tr>
                ))
              : users?.map((user: any) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <UserIdentity user={user} />
                    </td>
                    <td className="px-6 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge />
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-medium whitespace-nowrap">
                      Nov 24, 2024
                    </td>
                    <td className="px-6 py-4 text-right">
                      <MoreButton />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD LIST (below lg) ================= */}
      {/* Added flex-col gap-4 here to create the physical space between cards */}
      <div className="lg:hidden flex flex-col gap-4">
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-[24px] border border-gray-100 animate-pulse space-y-4"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))
          : users?.map((user: any) => (
              <div
                key={user.id}
                className="p-5 bg-white rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <UserIdentity user={user} />
                  <MoreButton />
                </div>

                <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-gray-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Shield size={10} /> Role
                    </p>
                    <RoleBadge role={user.role} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Activity size={10} /> Status
                    </p>
                    <StatusBadge />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={10} /> Joined
                    </p>
                    <p className="text-xs text-gray-900 font-bold">
                      Nov 24, 2024
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination Footer - Keeping it as a standalone card on mobile */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
        <p className="text-xs text-gray-400 font-medium order-2 sm:order-1">
          Showing{" "}
          <span className="text-gray-900 font-bold">{users?.length || 0}</span>{" "}
          members
        </p>
        <div className="flex gap-2 order-1 sm:order-2">
          <button className="px-4 py-1.5 text-xs font-bold border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm">
            Prev
          </button>
          <button className="px-4 py-1.5 text-xs font-bold border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE UI FRAGMENTS ================= */

const UserIdentity = ({ user }: { user: any }) => (
  <div className="flex items-center gap-3 min-w-0">
    <div className="relative w-10 h-10 rounded-full bg-[#F1F5F3] overflow-hidden border border-gray-100 shrink-0">
      <Image
        fill
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
        alt={user.name}
        className="object-cover"
      />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
      <p className="text-xs text-gray-400 flex items-center gap-1 truncate">
        <Mail size={12} className="shrink-0" /> {user.email}
      </p>
    </div>
  </div>
);

const RoleBadge = ({ role }: { role?: string }) => (
  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
    <Shield size={14} className="text-[#1B5E3F] shrink-0" />
    {role || "Member"}
  </div>
);

const StatusBadge = () => (
  <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100">
    Active
  </span>
);

const MoreButton = () => (
  <button className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100">
    <MoreHorizontal size={18} />
  </button>
);

export default UsersPage;
