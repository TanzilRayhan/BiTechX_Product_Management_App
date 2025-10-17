'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Navbar } from '@/components/common/Navbar';
import { Spinner } from '@/components/ui/Spinner';
import { Toaster } from 'react-hot-toast';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !token) {
      router.push('/login');
    }
  }, [isHydrated, token, router]);

  if (!isHydrated || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1821] via-[#4E6E5D] to-[#0D1821] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF1F3] via-white to-[#EFF1F3]">
      <Navbar />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#0D1821',
            color: '#EFF1F3',
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(13, 24, 33, 0.3)',
            border: '1px solid rgba(173, 138, 100, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#4E6E5D',
              secondary: '#EFF1F3',
            },
            style: {
              background: 'linear-gradient(135deg, #4E6E5D, #AD8A64)',
            },
          },
          error: {
            iconTheme: {
              primary: '#A44A3F',
              secondary: '#EFF1F3',
            },
            style: {
              background: 'linear-gradient(135deg, #A44A3F, #0D1821)',
            },
          },
        }}
      />
      
      <main className="animate-fade-in">{children}</main>
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 -left-10 w-64 h-64 bg-[#AD8A64]/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-10 w-96 h-96 bg-[#4E6E5D]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}
