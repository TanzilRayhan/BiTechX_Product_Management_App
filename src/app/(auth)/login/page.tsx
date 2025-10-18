'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Package, Mail, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import apiClient from '@/lib/api';
import toast from 'react-hot-toast';
import { LoginResponse } from '@/types';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim()
    .refine((email) => email.length >= 5, { message: 'Email must be at least 5 characters' })
    .refine((email) => email.length <= 100, { message: 'Email must be less than 100 characters' })
    .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: 'Email must be in a valid format (e.g., user@example.com)',
    }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<LoginResponse>('/auth', {
        email: data.email,
      });

      const { token } = response.data;

      const user = {
        id: crypto.randomUUID(),
        email: data.email,
        name: data.email.split('@')[0],
      };

      dispatch(setCredentials({ token, user }));

      toast.success('Login successful!');
      router.push('/products');
    } catch (error: any) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || error.message;
      const statusCode = error.response?.status;
      
      if (statusCode === 429) {
        const retryAfter = error.response?.headers['retry-after'] || 10;
        toast.error(`Too many login attempts. Please wait ${retryAfter} seconds and try again.`, {
          duration: 1000,
          icon: '⏱️',
        });
      } else if (errorMessage?.includes('application') || errorMessage?.includes('applied')) {
        toast.error('Email not found. Please use the email you used when you applied to BiTechX.');
      } else if (statusCode === 401) {
        toast.error('Invalid email. Please check your email and try again.');
      } else if (statusCode === 404) {
        toast.error('Email not registered. Please use your BiTechX application email.');
      } else if (statusCode === 500 || statusCode >= 500) {
        toast.error('Server error. Please try again later.', {
          duration: 5000,
        });
      } else {
        toast.error(errorMessage || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1821] via-[#4E6E5D] to-[#0D1821]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-[#AD8A64] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-[#4E6E5D] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#EFF1F3] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="hidden lg:block text-[#EFF1F3] space-y-8 animate-fade-in-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#AD8A64] p-3 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <Package size={48} className="text-[#EFF1F3]" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-[#EFF1F3] to-[#AD8A64] bg-clip-text text-transparent">
                  ProductHub
                </h1>
              </div>
              <p className="text-2xl font-semibold text-[#EFF1F3]/90">
                Manage Your Products with Excellence
              </p>
              <p className="text-lg text-[#EFF1F3]/70 leading-relaxed">
                A powerful, secure platform designed for modern product management. 
                Streamline your workflow and grow your business.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2">
                <div className="bg-[#4E6E5D] p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-[#EFF1F3]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#EFF1F3]">Secure & Reliable</h3>
                  <p className="text-sm text-[#EFF1F3]/60">Enterprise-grade security</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2">
                <div className="bg-[#AD8A64] p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-[#EFF1F3]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#EFF1F3]">Lightning Fast</h3>
                  <p className="text-sm text-[#EFF1F3]/60">Optimized performance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2">
                <div className="bg-[#4E6E5D] p-3 rounded-lg">
                  <Sparkles className="w-6 h-6 text-[#EFF1F3]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#EFF1F3]">Intuitive Design</h3>
                  <p className="text-sm text-[#EFF1F3]/60">Easy to use interface</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto animate-fade-in-right">
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-[#AD8A64] p-3 rounded-2xl shadow-2xl">
                  <Package size={40} className="text-[#EFF1F3]" />
                </div>
                <h1 className="text-4xl font-bold text-[#EFF1F3]">ProductHub</h1>
              </div>
              <p className="text-[#EFF1F3]/80">Welcome back! Sign in to continue</p>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#0D1821] mb-2">Sign In</h2>
                <p className="text-[#4E6E5D]">Enter your email to access your account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#4E6E5D] group-focus-within:text-[#AD8A64] transition-colors" />
                  </div>
                  <input
                    type="text"
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#EFF1F3] border-2 border-transparent rounded-xl focus:border-[#AD8A64] focus:bg-white focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300 text-[#0D1821] placeholder-[#4E6E5D]/50"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-[#A44A3F] animate-shake">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] hover:from-[#AD8A64] hover:to-[#4E6E5D] text-[#EFF1F3] font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#EFF1F3]/30 border-t-[#EFF1F3] rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#4E6E5D]/10 to-[#AD8A64]/10 rounded-xl border border-[#4E6E5D]/20">
                <p className="text-xs text-[#0D1821]/70 text-center leading-relaxed">
                  <span className="font-semibold text-[#0D1821]">Note:</span> Please use the email address you provided 
                  when you applied to BiTechX. Need help?{' '}
                  <span className="text-[#4E6E5D] font-medium">Contact support</span>
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#EFF1F3]/60">
                © 2025 ProductHub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
