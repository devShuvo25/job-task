/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ReactNode, useState } from "react";
import { Bell, Mail, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GENERAL, NAV_MENU } from "@/constant/dasboardTab";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // This should ideally come from your Auth context/Redux
  const role = "SUPERADMIN";

  return (
    <div className="min-h-screen bg-[#F1F5F3] flex font-sans overflow-x-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`${
          isSidebarOpen ? "w-62" : "w-20"
        } bg-white transition-all duration-300 flex flex-col sticky top-0 h-screen z-50 border-r border-gray-100`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 mb-4">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1B5E3F] rounded-lg flex items-center justify-center text-white font-bold">
                D
              </div>
              <span className="text-[#111827] font-bold text-xl tracking-tight">Donezo</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>

        {/* Navigation Wrapper */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* Main Menu Section */}
          <div className="mb-6">
            <p className={`text-[10px] font-bold text-gray-400 tracking-widest px-7 mb-4 ${!isSidebarOpen && "hidden"}`}>
              MENU
            </p>
            <nav className="space-y-1 relative">
              {NAV_MENU[role]?.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className="relative flex items-center group transition-all duration-200"
                  >
                    {/* SAME-TO-SAME ACTIVE INDICATOR */}
                    {isActive && (
                      <div className="absolute left-0 w-[5px] h-8 bg-[#1B5E3F] rounded-r-full" />
                    )}

                    <div className={`flex items-center gap-4 px-7 py-2.5 w-full ${
                      isActive ? "text-[#111827]" : "text-gray-400 hover:text-gray-600"
                    }`}>
                      <Icon 
                        size={22} 
                        className={`${isActive ? "text-[#1B5E3F]" : "text-gray-400"}`} 
                        strokeWidth={isActive ? 2.5 : 2} 
                      />
                      
                      {isSidebarOpen && (
                        <span className={`text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                          {item.label}
                        </span>
                      )}

                      {/* Task Badge matching screenshot */}
                      {item.label === "Tasks" && isSidebarOpen && (
                        <span className="ml-auto bg-[#0A1F16] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                          12+
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* General Section */}
          <div>
            <p className={`text-[10px] font-bold text-gray-400 tracking-widest px-7 mb-4 ${!isSidebarOpen && "hidden"}`}>
              GENERAL
            </p>
            <nav className="space-y-1">
              {NAV_GENERAL?.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className="relative flex items-center group transition-all duration-200"
                  >
                    {isActive && (
                      <div className="absolute left-0 w-[5px] h-8 bg-[#1B5E3F] rounded-r-full" />
                    )}
                    <div className={`flex items-center gap-4 px-7 py-2.5 w-full ${
                      isActive ? "text-[#111827]" : "text-gray-400 hover:text-gray-600"
                    }`}>
                      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                      {isSidebarOpen && (
                        <span className={`text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                          {item.label}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Promo Card */}
        {isSidebarOpen && (
          <div className="p-5 m-5 bg-[#0A1F16] rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-white text-sm font-medium leading-tight">
                Download our <br /> Mobile App
              </p>
              <p className="text-gray-400 text-[10px] mt-1">Get easy in another way</p>
              <button className="mt-4 bg-[#1B5E3F] hover:bg-[#237a52] text-white text-[11px] font-bold py-2.5 px-4 rounded-xl w-full transition-colors">
                Download
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#1B5E3F] rounded-full blur-2xl opacity-40" />
          </div>
        )}
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header/Top Bar */}
        <header className="h-24 bg-transparent flex items-center justify-between px-10 shrink-0 shadow-sm mb-2">
          
          {/* Search Section */}
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} strokeWidth={2} />
              </div>
              <input
                type="text"
                placeholder="Search task"
                className="w-full bg-white border-none rounded-full py-3 px-12 text-sm text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1B5E3F]/20 transition-all shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                <span className="text-[10px] font-medium text-gray-400">⌘</span>
                <span className="text-[10px] font-medium text-gray-400">F</span>
              </div>
            </div>
          </div>

          {/* Right Side Icons & Profile */}
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors border border-gray-100/50">
              <Mail size={20} strokeWidth={1.5} />
            </button>
            
            <button className="p-3 bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors border border-gray-100/50">
              <Bell size={20} strokeWidth={1.5} />
            </button>

            {/* User Profile Pill - Same as Screenshot */}
            <div className="flex items-center gap-3 ml-2 bg-white pr-6 pl-1.5 py-1.5 rounded-full shadow-sm border border-gray-100/50">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F8C4B4] flex-shrink-0">
                <Image
                  fill 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Totok" 
                  alt="User Avatar"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-900 leading-none mb-1">Totok Michael</p>
                <p className="text-[11px] text-gray-400 font-medium leading-none">tmichael20@mail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="max-w-full">
            
            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;