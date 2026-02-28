/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useState, useEffect } from "react";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GENERAL, NAV_MENU } from "@/constant/dasboardTab";
import LayoutdHeader from "@/components/dashboard/LayoutHeader";

interface LayoutProps {
  children: ReactNode;
}

// ================= MOBILE APP PROMO CARD =================
const MobileAppCard = ({ collapsed }: { collapsed: boolean }) => {
  if (collapsed) return null;

  return (
    <div className="mx-4 mb-6 p-5 rounded-[24px] bg-gradient-to-br from-[#0A1F16] to-[#1B5E3F] relative overflow-hidden group">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-110 transition-transform duration-500" />
      
      <div className="relative z-10">
        {/* Badge Icon */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5E3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>
        </div>

        <h4 className="text-white font-bold text-sm leading-tight">
          Download our <br /> Mobile App
        </h4>
        <p className="text-white/60 text-[10px] mt-1 font-medium">Get easy in another way</p>

        <button className="w-full mt-4 py-2 bg-[#0D4D33] hover:bg-[#0A3D28] text-white text-[11px] font-bold rounded-full transition-colors border border-white/10">
          Download
        </button>
      </div>
    </div>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  const role = "SUPERADMIN" as keyof typeof NAV_MENU;

  const NavItem = ({ item, collapsed }: { item: any; collapsed: boolean }) => {
    const Icon = item.icon;
    const isActive = pathname === item.path;
    return (
      <Link href={item.path} className="relative flex items-center group transition-all duration-200">
        {isActive && <div className="absolute left-0 w-[5px] h-8 bg-[#1B5E3F] rounded-r-full" />}
        <div className={`flex items-center gap-4 px-7 py-2.5 w-full ${isActive ? "text-[#111827]" : "text-gray-400 hover:text-gray-600"}`}>
          <Icon size={22} className={`${isActive ? "text-[#1B5E3F]" : "text-gray-400"}`} strokeWidth={isActive ? 2.5 : 2} />
          {!collapsed && <span className={`text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>}
          {item.label === "Tasks" && !collapsed && (
            <span className="ml-auto bg-[#0A1F16] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">12+</span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-white flex font-sans overflow-x-hidden">
      
      {/* ================= MOBILE DRAWER ================= */}
      {isMobileDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden animate-in fade-in duration-200" 
          onClick={() => setMobileDrawerOpen(false)} 
        />
      )}
      
      <aside className={`bg-[#F7F7F7] fixed inset-y-0 left-0 z-[70]  w-72 flex flex-col transform transition-transform duration-300 lg:hidden ${isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-20 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1B5E3F] rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="text-[#111827] font-bold text-xl tracking-tight">Donezo</span>
          </div>
          <button onClick={() => setMobileDrawerOpen(false)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">
          <p className="text-[10px] font-bold text-gray-400 tracking-widest px-7 mb-4 uppercase">Menu</p>
          {NAV_MENU[role]?.map((item: any) => <NavItem key={item.label} item={item} collapsed={false} />)}
          <p className="text-[10px] font-bold text-gray-400 tracking-widest px-7 mb-4 mt-8 uppercase">General</p>
          {NAV_GENERAL?.map((item: any) => <NavItem key={item.label} item={item} collapsed={false} />)}
        </div>

        {/* Mobile Sidebar Bottom Card */}
        <MobileAppCard collapsed={false} />
      </aside>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className={`bg-[#F7F7F7] hidden lg:flex ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 flex-col sticky top-0 h-screen z-50 border-r border-gray-100`}>
        <div className="h-20 flex items-center justify-between px-6 mb-4 shrink-0">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1B5E3F] rounded-lg flex items-center justify-center text-white font-bold">D</div>
              <span className="text-[#111827] font-bold text-xl tracking-tight">Donezo</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <p className={`text-[10px] font-bold text-gray-400 tracking-widest px-7 mb-4 ${!isSidebarOpen && "invisible"}`}>MENU</p>
          <nav className="space-y-1">
            {NAV_MENU[role]?.map((item: any) => <NavItem key={item.label} item={item} collapsed={!isSidebarOpen} />)}
          </nav>
          
          <p className={`text-[10px] font-bold text-gray-400 tracking-widest px-7 mb-4 mt-6 ${!isSidebarOpen && "invisible"}`}>GENERAL</p>
          <nav className="space-y-1">
            {NAV_GENERAL?.map((item: any) => <NavItem key={item.label} item={item} collapsed={!isSidebarOpen} />)}
          </nav>
        </div>

        {/* Desktop Sidebar Bottom Card */}
        <MobileAppCard collapsed={!isSidebarOpen} />
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* Pass the toggle function to the header */}
        <LayoutdHeader setMobileDrawerOpen={setMobileDrawerOpen} />

        <main className="bg-[#F7F7F7] flex-1 overflow-y-auto px-4 m-3 rounded-2xl  lg:px-10 pb-10">
          <div className="max-w-7xl  mx-auto pt-6 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;