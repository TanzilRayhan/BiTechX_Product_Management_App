'use client';

import { Toaster } from 'react-hot-toast';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
      
      {children}
    </>
  );
}
