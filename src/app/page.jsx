'use client';

import Header from '@/app/components/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Skeleton from './components/Skeleton';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/consulta');
  }, [router]);

  return <Skeleton />;
}
