'use client';

import Sidebar from '@components/Sidebar';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  if (!data) {
    redirect('/');
  }

  return <Sidebar>{children}</Sidebar>;
}
