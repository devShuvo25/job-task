/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Mail, Globe, Camera, Save } from "lucide-react";
import DashboardHeader from "../overview/DashboardHeader";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-[#F8F8F8] min-h-screen">
      <DashboardHeader
        title="Settings"
        description="Manage your account settings and set e-mail preferences."
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-[24px] border border-gray-100 p-2 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#1B5E3F] text-white shadow-md"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "security" && <SecuritySettings />}

            {/* Footer Actions */}
            <div className="px-6 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-3">
              <button className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
                Cancel
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1B5E3F] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-sm">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= SUB-COMPONENTS =================

const ProfileSettings = () => (
  <div className="p-6 md:p-8 space-y-8">
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Avatar Upload */}
      <div className="relative group">
        <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-sm overflow-hidden relative">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Totok"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-[#1B5E3F] hover:scale-110 transition-transform">
          <Camera size={16} />
        </button>
      </div>

      {/* Form Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <InputGroup label="First Name" placeholder="Totok" />
        <InputGroup label="Last Name" placeholder="Michael" />
        <InputGroup
          label="Email Address"
          placeholder="tmichael20@mail.com"
          icon={Mail}
        />
        <InputGroup label="Language" placeholder="English (US)" icon={Globe} />
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div className="p-6 md:p-8 space-y-6">
    <ToggleGroup
      title="Email Notifications"
      description="Receive emails about your task updates and team activity."
    />
    <ToggleGroup
      title="Desktop Notifications"
      description="Show floating alerts on your desktop for urgent tasks."
      initialChecked
    />
  </div>
);

const SecuritySettings = () => (
  <div className="p-6 md:p-8 space-y-8">
    <div className="space-y-6 max-w-md">
      <InputGroup
        label="Current Password"
        type="password"
        placeholder="••••••••"
      />
      <InputGroup label="New Password" type="password" placeholder="••••••••" />
      <InputGroup
        label="Confirm New Password"
        type="password"
        placeholder="••••••••"
      />
    </div>
  </div>
);

// ================= UI HELPERS =================

const InputGroup = ({ label, placeholder, icon: Icon, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 ${Icon ? "pl-12" : "px-4"} pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#1B5E3F]/10 outline-none transition-all`}
      />
    </div>
  </div>
);

const ToggleGroup = ({ title, description, initialChecked = false }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors">
    <div className="space-y-0.5">
      <p className="text-sm font-bold text-gray-900">{title}</p>
      <p className="text-xs text-gray-400 font-medium">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={initialChecked}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B5E3F]"></div>
    </label>
  </div>
);

export default SettingsPage;
