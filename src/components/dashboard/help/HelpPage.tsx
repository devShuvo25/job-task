/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Search,
  MessageCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  LifeBuoy,
  Mail,
  Youtube,
} from "lucide-react";
import DashboardHeader from "../overview/DashboardHeader";

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { title: "Getting Started", icon: FileText, articles: 12 },
    { title: "Account & Billing", icon: Mail, articles: 8 },
    { title: "Team Management", icon: MessageCircle, articles: 15 },
    { title: "Video Tutorials", icon: Youtube, articles: 6 },
  ];

  const faqs = [
    {
      q: "How do I invite new team members?",
      a: "Go to the Team Members page and click 'Invite User' at the top right.",
    },
    {
      q: "Can I export my project data?",
      a: "Yes, you can export your data as CSV or JSON from the Project Settings menu.",
    },
    {
      q: "What is the storage limit for free users?",
      a: "Free tier users get 5GB of cloud storage for project attachments.",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-[#F8F8F8] min-h-screen">
      <DashboardHeader
        title="Help Center"
        description="Search for help articles or contact our support team."
      />

      {/* Hero Search Section */}
      <div className="bg-[#1B5E3F] rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            How can we help you today?
          </h2>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, and more..."
              className="w-full py-4 pl-12 pr-4 bg-white rounded-2xl shadow-xl outline-none text-gray-900 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Help Categories */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bg-white p-6 rounded-[24px] border border-gray-100 hover:border-[#1B5E3F]/30 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B5E3F]/10 transition-colors">
                  <cat.icon size={24} className="text-[#1B5E3F]" />
                </div>
                <h3 className="font-bold text-gray-900">{cat.title}</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">
                  {cat.articles} Articles
                </p>
              </div>
            ))}
          </div>

          {/* FAQ Accordion Section */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h3>
            <div className="divide-y divide-gray-50">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-sm font-bold text-gray-700">
                      {faq.q}
                    </span>
                    <ChevronRight
                      size={18}
                      className="text-gray-400 group-open:rotate-90 transition-transform"
                    />
                  </summary>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Support Contact */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#F1F5F3] rounded-full flex items-center justify-center mx-auto mb-4">
              <LifeBuoy size={32} className="text-[#1B5E3F]" />
            </div>
            <h3 className="font-bold text-gray-900">Still need help?</h3>
            <p className="text-xs text-gray-400 font-medium mt-2 px-4">
              Our support team is available Mon-Fri, 9am - 5pm EST.
            </p>
            <button className="w-full mt-6 py-3 bg-[#1B5E3F] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Live Chat
            </button>
            <button className="w-full mt-3 py-3 bg-white border border-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Mail size={18} />
              Email Support
            </button>
          </div>

          <div className="bg-[#0A1F16] p-6 rounded-[24px] text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-bold text-sm">Community Forum</h4>
              <p className="text-[11px] text-white/60 mt-1">
                Join 5,000+ members in our community.
              </p>
              <button className="mt-4 text-[11px] font-bold flex items-center gap-1 hover:underline">
                Visit Forum <ExternalLink size={12} />
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
