/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Eye, EyeOff, ArrowRight, Bubbles } from "lucide-react";
import { useRegisterUserMutation } from "@/redux/api/authApi";

const registerSchema = z.object({
  name: z.string().nonempty("Required"),
  email: z.string().nonempty("Required").email("Invalid"),
  password: z.string().nonempty("Required").min(6, "6+ chars"),
  // role: z.enum(["USER", "DESIGNER", "ENGINEER", "STORE"] as const),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res: any = await registerUser({ data }).unwrap();
      if (res?.success) {
        toast.success("Done!");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-sm w-full bg-white p-6 rounded-0.5 border border-slate-100 shadow-sm"
      >
        {/* Compact Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
            <Bubbles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 leading-none uppercase tracking-tighter">
              Register
            </h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              StudioPorto Network
            </p>
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-slate-900/10 transition-all outline-none"
            />
            {errors.name && (
              <p className="text-[9px] text-red-500 font-bold ml-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-slate-900/10 transition-all outline-none"
            />
          </div>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-slate-900/10 transition-all outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {/* <select
            {...register("role")}
            className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-bold appearance-none cursor-pointer outline-none"
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="DESIGNER">Seller</option>
          </select> */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-brand-primary hover:text-slate-900 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? "Wait..." : "Create Account"}
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Have account?{" "}
            <span className="text-slate-900 border-b border-yellow-400">
              Login
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
