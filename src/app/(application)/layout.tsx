'use client';

import Sidebar from '@components/Sidebar';
import Loading from '@components/Loading';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
