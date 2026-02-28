'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  RefreshCcw,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';

const ChangePassword = () => {
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-background p-10 rounded-3xl border border-foreground/5 shadow-2xl shadow-primary/5"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
              <RefreshCcw size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Set New Password</h2>
          <p className="text-sm text-foreground/60 max-w-xs mx-auto">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        {/* Change Password Form */}
        <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {/* New Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground/60 ml-2">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/30 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-4 bg-foreground/5 border border-transparent rounded-2xl text-sm placeholder-foreground/30 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/30 hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground/60 ml-2">Confirm New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/30 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-4 bg-foreground/5 border border-transparent rounded-2xl text-sm placeholder-foreground/30 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/30 hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="p-4 bg-foreground/5 rounded-2xl space-y-2">
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Requirements</p>
            <div className="flex items-center gap-2 text-xs font-medium text-foreground/60">
              <CheckCircle2 size={14} className="text-primary" />
              Minimum 8 characters
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-foreground/60">
              <CheckCircle2 size={14} className="text-primary" />
              One special character
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            Update Password
            <ShieldCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1 transition-all" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePassword;