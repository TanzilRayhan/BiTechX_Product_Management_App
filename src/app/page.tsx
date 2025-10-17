'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Spinner } from '@/components/ui/Spinner';

export default function Home() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      router.push('/products');
    } else {
      router.push('/login');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1821] via-[#4E6E5D] to-[#0D1821] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
