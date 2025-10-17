'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Package, Plus, LayoutDashboard } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully', {
      icon: '👋',
      style: {
        borderRadius: '12px',
        background: '#0D1821',
        color: '#EFF1F3',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0D1821] via-[#4E6E5D] to-[#0D1821] shadow-lg backdrop-blur-sm border-b border-white/10">
      <div className="px-4 sm:px-10 lg:px-24 lg:py-4">
        <div className="flex items-center justify-between h-16">
     
          <Link 
            href="/products" 
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="bg-gradient-to-br from-[#AD8A64] to-[#4E6E5D] p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 animate-float">
              <Package size={28} className="text-[#EFF1F3]" />
            </div>
            <span className="text-xl font-bold text-[#EFF1F3]">Product Hub</span>
          </Link>

          <div className="flex items-center gap-3">
            {!token ? (
              <Link 
                href="/login" 
                className="px-5 py-2.5 bg-gradient-to-r from-[#AD8A64] to-[#4E6E5D] text-[#EFF1F3] rounded-xl hover:from-[#4E6E5D] hover:to-[#AD8A64] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            ) : (
              <>
              
                {user && (
                  <div className="hidden lg:flex items-center gap-2 px-6 py-2 bg-white/5 rounded-lg border border-white/10">
                    {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#AD8A64] to-[#4E6E5D] flex items-center justify-center text-[#EFF1F3] font-semibold text-sm">
                      {user.email[0].toUpperCase()}
                    </div> */}
                    <span className="text-sm text-[#EFF1F3] font-medium">
                      {user.email}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#A44A3F] to-[#A44A3F]/80 text-[#EFF1F3] rounded-lg hover:bg-[#A44A3F] hover:text-white transition-all duration-200 group min-w-[40px] h-[40px]"
                  title="Logout"
                >
                  <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="hidden lg:inline text-sm font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
