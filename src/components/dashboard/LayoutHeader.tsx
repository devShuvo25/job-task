/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { Search, Bell, Mail, Menu } from 'lucide-react';
import Image from 'next/image';

const LayoutdHeader = ({ setMobileDrawerOpen }: any) => {
  return (
    <header className="h-20 lg:h-24 bg-[#F8F8F8] flex items-center justify-between gap-4 px-4 lg:px-10 shrink-0 z-40 mx-3 mt-3 rounded-2xl">
      
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileDrawerOpen(true)} 
          className="flex lg:hidden p-2 bg-white rounded-xl shadow-sm border border-gray-100 shrink-0"
        >
          <Menu size={22} className="text-[#1B5E3F]" />
        </button>

        {/* Search Bar */}
        <div className="w-full max-w-[320px]">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" size={20} />
            <input
              type="text"
              placeholder="Search task"
              className="w-full bg-white rounded-full py-3 pl-12 pr-14 text-[15px] text-gray-400 font-medium shadow-sm outline-none border border-transparent focus:border-gray-100 transition-all"
            />
            {/* Shortcut hint */}
            <div className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center px-2 py-1 bg-[#E8E8E8] rounded-md border border-gray-200">
              <span className="text-[11px] font-bold text-gray-500 flex items-center gap-0.5">
                <span className="text-sm leading-none">⌘</span> F
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Notification, Mail, Profile */}
      <div className="flex items-center gap-4 lg:gap-5">
        {/* Mail Icon */}
        <button className="flex p-3 bg-white rounded-full shadow-sm text-gray-800 border border-gray-50">
          <Mail size={20} />
        </button>

        {/* Bell Icon */}
        <button className="flex p-3 bg-white rounded-full shadow-sm text-gray-800 border border-gray-50">
          <Bell size={20} />
        </button>

        {/* User Profile - Transparent background to match image */}
        <div className="flex items-center gap-3 pl-2">
          <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-sm shrink-0">
            <Image
              fill 
              src="https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg" 
              alt="User Avatar"
              className="object-cover bg-[#D9A7A7]" // Added subtle bg color to avatar frame
            />
          </div>
          <div className="hidden lg:flex flex-col">
            <p className="text-[16px] font-bold text-gray-900 leading-tight">Totok Michael</p>
            <p className="text-[13px] text-gray-400 font-medium leading-tight">tmichael20@mail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LayoutdHeader;