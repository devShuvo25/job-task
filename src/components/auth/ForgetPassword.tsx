'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 

  Mail, 
  ArrowLeft, 
  Send,
  ShieldQuestion
} from 'lucide-react';

const ForgetPassword = () => {
  const [isSent, setIsSent] = React.useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-background p-10 rounded-3xl border border-foreground/5 shadow-2xl shadow-primary/5"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
              <ShieldQuestion size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Forgot Password?</h2>
          <p className="text-sm text-foreground/60 max-w-xs mx-auto">
            No worries! Enter your email below and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {!isSent ? (
          <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSent(true); }}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground/60 ml-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/30 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="block w-full pl-10 pr-3 py-4 bg-foreground/5 border border-transparent rounded-2xl text-sm placeholder-foreground/30 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              Send Reset Link
              <Send size={18} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1 transition-all" />
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center space-y-4"
          >
            <div className="text-primary font-bold">Check your inbox!</div>
            <p className="text-xs text-foreground/60 leading-relaxed">
              We&apos;ve sent a password reset link to <span className="text-foreground font-bold">your email</span>. Please click the link in that email to continue.
            </p>
            <button 
              onClick={() => setIsSent(false)} 
              className="text-xs font-bold text-primary hover:underline hover:text-secondary transition-colors"
            >
              Didn&apos;t receive the email? Resend
            </button>
          </motion.div>
        )}

        <div className="mt-8 pt-8 border-t border-foreground/5">
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;