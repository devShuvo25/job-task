"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Large 404 Text */}
        <div className="relative">
          <h1 className="text-[120px] font-black text-gray-100 leading-none">
            404
          </h1>
          <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900 mt-8">
            Page Not Found
          </p>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Oops! Lost in space?</h2>
          <p className="text-gray-400 text-sm font-medium px-6">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <Link href="/" className="w-full sm:w-auto">
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#1B5E3F] rounded-2xl hover:opacity-90 transition-all shadow-sm w-full justify-center">
              <Home size={18} />
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;